import { Button, Grid, Typography } from "@mui/material";

interface BarTitleProps {
    title: string;
    isShowButton?: boolean;
    buttonText?: string;
    onClick?: () => void
}

const BarTitle = ({ title = '', isShowButton = false, buttonText = 'button', onClick = () => { } }: BarTitleProps) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ bgcolor: '#1a237e', padding: 1, color: "white", mb: 2 }}>
            <Grid item>
                <Typography variant="subtitle1">
                    {title}
                </Typography>
            </Grid>
            {
                isShowButton && <Grid item>
                    <Button size="small"
                        onClick={() => onClick()}
                        sx={{ textTransform: "capitalize", color: "white" }}>
                        {buttonText}
                    </Button>
                </Grid>
            }
        </Grid>
    )
}

export default BarTitle;