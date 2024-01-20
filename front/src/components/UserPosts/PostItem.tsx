import { ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography } from '@mui/material';

interface PostItemProps {
    title: string; 
    body: string;  
    userName: string; 
    isShowDivider?: boolean;
}

const PostItem = ({ title, body, userName, isShowDivider = true }: PostItemProps) => {
   
    return (
        <>
            <ListItem alignItems="flex-start" sx={{ height: "116px" }}>
                <ListItemAvatar>
                    <Avatar>{userName[0]}</Avatar>
                </ListItemAvatar>
                {/* Usig Typography to cut long lines text and add elipsis */}
                <ListItemText
                    primary={<Typography
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight:"bold",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                        }}>
                        {title}
                    </Typography>}
                    secondary={
                        <Typography
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                            }}>
                            {body}
                        </Typography>
                    }
                />
            </ListItem>
            {isShowDivider && <Divider variant="inset" component="li" />}
        </>
    )
}

export default PostItem;