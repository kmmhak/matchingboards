import React from 'react';
import DeleteAccount from '../components/DeleteAccount';
import Logout from '../components/Logout';
import NavBar from '../components/Navbar';

function Home() {
  return (
    <div>
      <NavBar />
      <p>Home</p>
      <Logout />
      <br />
      <br />
      <DeleteAccount />
    </div>
  );
}

export default Home;
