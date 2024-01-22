import { Paper, Box, TextField, Grid, Button, LinearProgress, Alert, Snackbar } from "@mui/material";
import BarTitle from "../shared/BarTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectPostBody, selectPostTitle, setPostBody, setPostTitle, selectIsSnackOpen, setIsSnackOpen } from "../../features/newPost/newPostUISlice";
import { selectSelectedUserId } from "../../features/users/usersUISlice";
import { selectUserById } from "../../features/users/usersSlice";
import { useAddNewPostMutation } from "../../features/posts/postsSlice";
import { useAppSelector } from "../../app/hooks";
import { getErrorMessage } from "../../services/helpers";
import { AppConfig } from "../../config/config";

const NewPost = () => {

    const title = useSelector(selectPostTitle);
    const body = useSelector(selectPostBody);
    const selectedUserId = useSelector(selectSelectedUserId);
    const isSnackOpen = useSelector(selectIsSnackOpen);

    // const user = useAppSelector(state => selectUserById(state, selectedUserId));

    const [addNewPost, { isLoading, isError, error }] = useAddNewPostMutation();

    // Get error message from the error object or returns a default error message
    const errorMessage = isError && getErrorMessage(error);

    const successfulPostCreationMessage = AppConfig.strings.newPost.successfulCreationMessage;

    const dispatch = useDispatch();

    const handleTitleChange = (title: string) => {
        dispatch(setPostTitle(title));
    }

    const handleBodyChange = (body: string) => {
        dispatch(setPostBody(body));
    }

    const handleClear = () => {
        dispatch(setPostTitle(''));
        dispatch(setPostBody(''));
    }

    const onSavePostClicked = async () => {
        if (selectedUserId) {
            await addNewPost({ title, body, userId: selectedUserId }).unwrap()
            dispatch(setPostTitle(''));
            dispatch(setPostBody(''));
            dispatch(setIsSnackOpen(true));
        }
    }

    const HandleSnackClose = () => {
        dispatch(setIsSnackOpen(false));
    }

    return (
        <Paper sx={{ pb: 2, overflow: "hidden", mb: 4 }}>
            {
                selectedUserId ?
                    <NewPostBarTitle userId={selectedUserId} /> :
                    <BarTitle title="Create new post"></BarTitle>
            }

            <Snackbar open={isSnackOpen} autoHideDuration={6000} onClose={HandleSnackClose}>
                <Alert
                    onClose={HandleSnackClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successfulPostCreationMessage}
                </Alert>
            </Snackbar>

            {
                isLoading && <Box sx={{ width: '100%', p: 4, boxSizing: "border-box" }}>
                    <LinearProgress />
                </Box>
            }
            {
                isError && <Box sx={{ px: 2 }}>
                    <Alert severity="error">{ errorMessage }</Alert>
                </Box>
            }
            <Grid container>
                <Grid item xs={12} md={10}>
                    <Box sx={{ px: 3, mb: 4 }}>
                        <TextField
                            value={title}
                            disabled={!selectedUserId || isLoading}
                            onChange={(event) => handleTitleChange(event.target.value)}
                            fullWidth id="standard-basic"
                            label="Title"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{ px: 3, mb: 4 }}>
                        <TextField
                            value={body}
                            disabled={!selectedUserId || isLoading}
                            onChange={(event) => handleBodyChange(event.target.value)}
                            label="Post Body"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Box sx={{ px: 3, mb: 4 }}>
                        <Button
                            disabled={!selectedUserId || isLoading}
                            onClick={() => onSavePostClicked()}
                            variant="contained" sx={{ mr: 2 }}>Save</Button>
                        <Button
                            disabled={!selectedUserId || isLoading}
                            onClick={() => handleClear()}
                            variant="outlined">Clear</Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default NewPost;

interface NewPostBarTitleProps {
    userId: number;
}
const NewPostBarTitle = ({ userId }: NewPostBarTitleProps) => {

    const { name } = useAppSelector(state => selectUserById(state, userId));

    return (
        <BarTitle title={`Create new post (${name})`}></BarTitle>
    )
}