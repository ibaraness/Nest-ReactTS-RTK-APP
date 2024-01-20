import { Paper, List, Box, ListItem } from '@mui/material';
import { selectSelectedUserId } from '../../features/users/usersUISlice';
import BarTitle from '../shared/BarTitle';
import { useAppSelector } from '../../app/hooks';
import UserPostRows from './UserPostRows';

const UserPosts = () => {

    const selectedUserId = useAppSelector(selectSelectedUserId);

    const blankList = (
        <List sx={{ width: '100%', xs: { maxWidth: 360 }, bgcolor: 'background.paper', height: 350, overflow: 'auto' }}>
            <ListItem>
                <Box sx={{ backgroundColor: "#eeeeee", width: "100%", height: 300 }} ></Box>
            </ListItem>
        </List>
    )

    return (
        <Paper sx={{ width: '100%', mb: 2, overflow: "hidden" }}>
            <BarTitle title="Users posts"></BarTitle>
            {
                selectedUserId ? <UserPostRows userId={selectedUserId}></UserPostRows> : blankList
            }
        </Paper>
    )
}
export default UserPosts;