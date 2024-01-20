import {ListItem, Grid, Skeleton} from '@mui/material';

const PostLoadingItem = () => {
    return (
        <ListItem>
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <Skeleton variant="circular" sx={{}} width={45} height={45}></Skeleton>
                </Grid>
                <Grid item xs={10}>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <Skeleton variant='rounded' sx={{}} height={30}></Skeleton>
                        </Grid>
                        <Grid item xs={12}>
                            <Skeleton variant='rounded' sx={{}} height={80}></Skeleton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default PostLoadingItem;