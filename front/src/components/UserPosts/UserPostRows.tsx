import { List, Alert, Box } from '@mui/material';
import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetUserPostsQuery, Post } from '../../features/posts/postsSlice';
import { selectUserById, User } from '../../features/users/usersSlice';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../services/helpers';
import PostItem from './PostItem';
import PostLoadingItem from './PostLoadingItem';

interface UserPostRowsProps {
    userId: number;
}

const UserPostRows = ({ userId }: UserPostRowsProps) => {

    const selectedUser = useAppSelector(state => selectUserById(state, userId));
    const loadingRowsNum = 2; // How many skeleton rows should be displayed while fetching data

    // Load user posts only when we have a valid user Id (`selectedUserId`)
    const { data: posts = [], isError, error, isFetching } = useGetUserPostsQuery(userId, {
        skip: !userId
    });

    let errorMessage = '';

    if (isError) {
        if (isFetchBaseQueryError(error) && isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
    }

    // Caching skeleton and user posts rows to avoid recalculation of rows for each render
    const postListItems = useMemo(() => createPostListItems(posts, selectedUser), [posts, selectedUser]);
    const loadingRows = useMemo(() => createPostLoadingRows(loadingRowsNum), [loadingRowsNum]);

    return (
        <>
            {/* Display error alert message on error laoding users */}
            {
                isError && <Box sx={{ px: 2 }}>
                    <Alert severity="error">{errorMessage || "Unknown error, please try again later"}</Alert>
                </Box>
            }
            <List sx={{ width: '100%', xs: { maxWidth: 360 }, bgcolor: 'background.paper', height: 350, overflow: 'auto' }}>
                {/* Show laoding skeletons when loading or post rows when done loading */}
                {
                    isFetching ? loadingRows : postListItems
                }
            </List>
        </>
    )
}
export default UserPostRows;

// Putting post rows creation in a method for later caching, instead of recreting for each render
const createPostListItems = (posts: Post[], selectedUser: User) => posts.map(({ title, body, id }, i) => {
    const isShowDivider = i < posts.length - 1;
    return (
        <PostItem
            key={id}
            title={title}
            body={body}
            userName={selectedUser?.name || 'User'}
            isShowDivider={isShowDivider}
        ></PostItem>
    )
});

// Putting loadnig rows creation in a method for later caching, instead of recreting for each render
const createPostLoadingRows = (rowsNum: number) => {
    const rows = [];
    for (let i = 0; i < rowsNum; i++) {
        rows.push(<PostLoadingItem key={i}></PostLoadingItem>)
    }
    return rows;
}