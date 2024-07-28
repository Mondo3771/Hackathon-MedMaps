// import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

import Maps from "./Components/Maps/Maps";
import HomePage from "./Pages/HomePage";
import ClinicProfile from "./Pages/ClinicProfile/ClinicProfile";
// import Announcements from "./Components/Announcements/Announcements";
// import MakeAnnouncement from "./Components/MakeAnnouncement/MakeAnnouncement";
// import { fetchLocalStorage } from "./helpers/helpers";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";

// import { fetchLocalStorage, setLocalStorage } from './helpers/helpers';

// import ProfileComp from "./Components/ProfileComp/ProfileComp";
// import Header from "./Components/Header/Header";
import CreateClinic from "./Sign Up page/CreateClinic";

function App() {
  

  const router = createBrowserRouter(
    createRoutesFromChildren(
      //
      <Route path={'/'}>
          <Route  index element={<HomePage/>} />
          <Route  path={'/CreateClinic'} element={<CreateClinic/>} />
          <Route  path={'/Profile'} element={<ClinicProfile/>} />


      </Route>
      

      
    )
  )
 
  return (
  // <> <LoginButton />
  // <LogoutButton />
  // <Profile /></>
  // <>
  // <Header></Header>
  // <HomePage></HomePage></>
  // <Router>
  //   <Switch>
  //     <Route path="/" exact component={HomePage} />
  //     </Switch>
  // </Router>
  <RouterProvider router={router}></RouterProvider>
  
       
        
     
  );
}

export default App;
// Admin
// Admin@gmail.com
// 123456789Ad.
