import { createTheme } from '@mui/material/styles';

// Overriding the default theme to reset the body and add backgournd color
const baseTheme = createTheme({
    components: {
      // Global styles for the body element
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: "#e3f2fd",
            minHeight: '100vh', // Ensures the background covers the entire viewport
          },
        },
      },
    },
  });
  
export default baseTheme;