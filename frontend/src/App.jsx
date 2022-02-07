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
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div>
        <UserProvider>
          <Routes>
            <Route path="/addgame" element={<ProtectedRoute />}>
              <Route path="/addgame" element={<AddGame />} />
            </Route>
            <Route path="/changepassword" element={<ProtectedRoute />}>
              <Route path="/changepassword" element={<ChangePassword />} />
            </Route>
            <Route path="/currentsession" element={<ProtectedRoute />}>
              <Route path="/currentsession" element={<CurrentSession />} />
            </Route>
            <Route path="/friendgroups" element={<ProtectedRoute />}>
              <Route path="/friendgroups" element={<FriendGroups />} />
            </Route>
            <Route path="/joinsession" element={<ProtectedRoute />}>
              <Route path="/joinsession" element={<JoinSession />} />
            </Route>
            <Route path="/mygames" element={<ProtectedRoute />}>
              <Route path="/mygames" element={<MyGames />} />
            </Route>
            <Route path="/notifications" element={<ProtectedRoute />}>
              <Route path="/notifications" element={<Notifications />} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/setlocation" element={<ProtectedRoute />}>
              <Route path="/setlocation" element={<SetLocation />} />
            </Route>
            <Route path="/settings" element={<ProtectedRoute />}>
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
