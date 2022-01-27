import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddGame from './pages/AddGame';
import ChangePassword from './pages/ChangePassword';
import CurrentSession from './pages/CurrentSession';
import FriendGroups from './pages/FriendGroups';
import Home from './pages/Home';
import JoinSession from './pages/JoinSession';
import Login from './pages/Login';
import MyGames from './pages/MyGames';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SetLocation from './pages/SetLocation';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/addgame" element={<AddGame/>} />
      <Route path="/changepassword" element={<ChangePassword/>} />
      <Route path="/currentsession" element={<CurrentSession/>} />
      <Route path="/friendgroups" element={<FriendGroups/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/joinsession" element={<JoinSession/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/mygames" element={<MyGames/>} />
      <Route path="/notifications" element={<Notifications/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/setlocation" element={<SetLocation/>} />
      <Route path="/settings" element={<Settings/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;