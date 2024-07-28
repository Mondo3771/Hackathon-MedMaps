import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Maps from './Components/Maps/Maps';
import HomePage from "./Pages/HomePage";
import ClinicProfile from "./Pages/ClinicProfile/ClinicProfile";


// import { fetchLocalStorage, setLocalStorage } from './helpers/helpers';


import ProfileComp from "./Components/ProfileComp/ProfileComp";
import Header from "./Components/Header/Header";

function App() {
  


 
  return (
  // <> <LoginButton />
  // <LogoutButton />
  // <Profile /></>
  <>
  <Header></Header>
  <HomePage></HomePage></>
       
        
     
  );
}

export default App;
// Admin
// Admin@gmail.com
// 123456789Ad.