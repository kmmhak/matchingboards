import React from 'react';
import DeleteAccount from '../components/deleteAccount';
import FindUser from '../components/FindUser';
import Logout from '../components/logout';

function Home() {
  return (
    <div>
      <p>Home</p>
      <FindUser />
      <Logout />
      <br />
      <br />
      <DeleteAccount />
    </div>
  );
}

export default Home;
