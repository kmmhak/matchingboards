import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, GlobalStyles } from '@mui/material';
import Router from './routes/Routes';
import theme from './assets/Themes';
import bg from './assets/stone-bg2.jpg';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          },
        }}
      />
      <BrowserRouter>
        <div>
          <Router />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
