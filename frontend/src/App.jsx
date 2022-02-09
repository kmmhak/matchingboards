import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './constants/Routes';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
