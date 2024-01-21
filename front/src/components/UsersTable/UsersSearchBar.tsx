import { Grid, Box, InputBase, IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUsersSearchTerm, setSearchTerm } from "../../features/users/usersUISlice";
import SearchIcon from '@mui/icons-material/Search';

const UsersSearchBar = () => {

    const serachTerm = useAppSelector(selectUsersSearchTerm);
    const dispatch = useAppDispatch();

    const handleSearch = (term: string) => {
        dispatch(setSearchTerm(term));
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Box sx={{ m: 1, borderBottom: 1, borderColor: "#bbb", display: "flex" }}>
                    <InputBase
                        value={serachTerm}
                        onChange={(event) => handleSearch(event.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search users..."
                        inputProps={{ 'aria-label': 'search users...' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    )
}

export default UsersSearchBar;