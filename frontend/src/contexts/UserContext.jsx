import { useState, createContext, useContext, useMemo } from 'react';

const userContext = createContext({
  user: null,
  loggedIn: false,
  login: () => null,
  logout: () => null,
  update: () => null,
  token: null,
});

// TODO: Is it enough to throw errors in service and catching
// them where user context functions are called? Test.
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = (user, jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setLoggedIn(true);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const update = (user) => {
    setCurrentUser(user);
  };

  const values = useMemo(
    () => ({
      currentUser,
      loggedIn,
      login,
      logout,
      update,
      token,
    }),
    [currentUser, loggedIn, token],
  );

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
}

export function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('no context');
  }
  return context;
}
