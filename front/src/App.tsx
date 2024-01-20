import { Grid, Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import UsersTable from './components/UsersTable/UsersTable';
import UserPosts from './components/UserPosts/UserPosts';
import NewPost from './components/NewPost/NewPost';

function App() {

  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%"
        }}
      >
        <Container maxWidth="lg"
          sx={{
            height: "100vh",
            display: 'flex',
            my: 4,
            flexGrow: 1
          }}>

          <Grid
            container
            spacing={1}
            sx={{ flexDirection: { xs: "row" } }}
            columnSpacing={2}
          >
            <Grid item xs={12} md={8} >
              <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
                <UsersTable></UsersTable>
              </Box>

            </Grid>

            <Grid item xs={12} md={4}>
              <UserPosts></UserPosts>
            </Grid>
            <Grid item xs={12} md={12}>
              <NewPost></NewPost>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default App
