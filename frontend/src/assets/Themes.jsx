import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#51514f',
    },
    secondary: {
      main: '#342d2b',
    },
    input: {
      main: '#e4d4b3',
    },
    highlight: {
      main: '#848482'
    }
  },
  typography: {
    light: {
      color: '#e4d4b3',
    },
    dark: {
      color: '#342d2b',
    },
    white: {
      color: '#ffff',
    },
    fontFamily: 'Lora',
  },
});


export default theme;
