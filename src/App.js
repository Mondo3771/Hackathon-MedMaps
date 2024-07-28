import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Maps from "./Components/Maps/Maps";
import HomePage from "./Pages/HomePage";
import ClinicProfile from "./Pages/ClinicProfile/ClinicProfile";
import CreateClinic from "./Sign Up page/CreateClinic";

// import { fetchLocalStorage, setLocalStorage } from './helpers/helpers';

import ProfileComp from "./Components/ProfileComp/ProfileComp";

function App() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  };
  const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0(); //admin
    console.log(user);
    if (isAuthenticated && user.sub === process.env.REACT_APP_ADMIN_SUB) {
      // SHOULD REDIRECT ME TO THE ADMIN PAGE
      console.log("Take me to Admin Page");
    } else if (isAuthenticated) {
    } //clinic
    else {
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
    // <> <LoginButton />
    // <LogoutButton />
    // <Profile /></>
    <CreateClinic></CreateClinic>
  );
}

export default App;
// Admin
// Admin@gmail.com
// 123456789Ad.
