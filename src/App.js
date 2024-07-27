import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Maps from './Components/Maps/Maps';
import HomePage from "./Pages/HomePage";
import ClinicProfile from "./Pages/ClinicProfile/ClinicProfile";





function App() {
  //   const LoginButton = () => {
  //     const { loginWithRedirect } = useAuth0();

  //     return <button onClick={() => loginWithRedirect()}>Log In</button>;
  //   };
  //   const LogoutButton = () => {
  //     const { logout } = useAuth0();

  //     return (
  //       <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
  //         Log Out
  //       </button>
  //     );
  //   };
  //   const Profile = () => {
  //     const { user, isAuthenticated, isLoading } = useAuth0();

  //     if (isLoading) {
  //       return <div>Loading ...</div>;
  //     }

  //     return (
  //       isAuthenticated && (
  //         <div>
  //           <img src={user.picture} alt={user.name} />
  //           <h2>{user.name}</h2>
  //           <p>{user.email}</p>
  //         </div>
  //       )
  //     );
  //   };
  //   const formatTime = (date) => {
  //     let hours = date.getHours();
  //     let minutes = date.getMinutes();
  //     let seconds = date.getSeconds();

// const AddAHospital = ()=>{
//  fetch("/api/Hospitals", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // replace 'data' with the actual data you want to send
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));
// }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to relo d.
//         </p>
//         <button onClick={AddAHospital}>Call API</button>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <LoginButton />
//         <LogoutButton />
//         <Profile />
//       </header>
//     </div>
// );

  //     // Pad the hours, minutes, and seconds with leading zeros, if necessary
  //     hours = hours < 10 ? '0' + hours : hours;
  //     minutes = minutes < 10 ? '0' + minutes : minutes;
  //     seconds = seconds < 10 ? '0' + seconds : seconds;

  //     // Format the time in the 'HH:mm:ss' format
  //     return hours + ':' + minutes + ':' + seconds;
  // };

  // const open = new Date();
  // open.setHours(8,0,0,0);
  // const openingTime = formatTime(open);

  // const close = new Date();
  // close.setHours(14,0,0,0);
  // const closingTime = formatTime(close);
  // const data = {
  //   name :"Example Hospital" ,
  //   address:"123 Street Ave",
  //   tel :"123456789012" ,
  //   openingTime: openingTime,
  //   closingTime:closingTime,
  //   isClinic:true,
  //   public:true,
  //   open24Hours:true,
  //   email:"ecxample@gmail.com",
  //   website:"example.com.ac.za",
  //   Specialties:"Orthopedics,Dermatology,Neurology"
  // }

// const AddAHospital = ()=>{
//  fetch("/api/Hospitals", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // replace 'data' with the actual data you want to send
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));
// }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to relo d.
//         </p>
//         <button onClick={AddAHospital}>Call API</button>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <LoginButton />
//         <LogoutButton />
//         <Profile />
//       </header>
//     </div>
// );


  // const AddAHospital = ()=>{
  //  fetch("/api/Hospitals", {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data), // replace 'data' with the actual data you want to send
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch((error) => console.error('Error:', error));
  // }
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to relo d.
  //         </p>
  //         <button onClick={AddAHospital}>Call API</button>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //         <LoginButton />
  //         <LogoutButton />
  //         <Profile />
  //       </header>
  //     </div>
  // );
  return <ClinicProfile/>

}

export default App;
