import React from 'react';
import DeleteAccount from '../components/DeleteAccount';
import Logout from '../components/Logout';

function Home() {
  return (
    <div>
      <p>Home</p>
      <Logout />
      <br />
      <br />
      <DeleteAccount />
    </div>
  );
}

export default Home;
