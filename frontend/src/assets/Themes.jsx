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
    fontFamily: 'Lora',
  },
});


export default theme;
