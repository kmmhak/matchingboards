import React from 'react';
import DeleteAccount from '../components/deleteAccount';
import UserSearchBar from '../components/UserSearchBar';
import Logout from '../components/logout';

function Home() {
  return (
    <div>
      <p>Home</p>
      <UserSearchBar />
      <Logout />
      <br />
      <br />
      <DeleteAccount />
    </div>
  );
}

export default Home;
