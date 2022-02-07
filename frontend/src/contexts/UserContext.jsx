import { useState, createContext, useContext } from 'react';
import * as User from '../services/UserService';

const userContext = createContext({
  user: null,
  loggedIn: false,
  login: () => null,
  logout: () => null,
  update: () => null,
});

// TODO: Is it enough to throw errors in service and catching
// them where user context functions are called? Test.
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (input) => {
    const response = await User.login(input);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setLoggedIn(true);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const update = async () => {
    const response = await User.getById(currentUser.id);
    setCurrentUser(response.data.user);
  };

  return (
    <userContext.Provider
      value={(currentUser, loggedIn, login, logout, update)}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('no context');
  }
  return context;
}
