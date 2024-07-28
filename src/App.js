import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

// in your render method:

// import { fetchLocalStorage, setLocalStorage } from './helpers/helpers';



function App() {
  
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };
  const LogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    );
  };
  const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user);
    if (isAuthenticated && user.sub == process.env.REACT_APP_ADMIN_SUB){
      // SHOULD REDIRECT ME TO THE ADMIN PAGE
      console.log("Take me to Admin Page");
    }
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return (
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )
    );
  };
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to relo d.
        </p>
        {/* <button onClick={UpdateClinic}>Call API</button> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reac
        </a>
        <LoginButton />
        <LogoutButton />
        <Profile />
        
      </header>
    </div>
  );
}

export default App;
// Admin
// Admin@gmail.com
// 123456789Ad.