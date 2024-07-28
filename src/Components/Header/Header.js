import "./Header.styles.js";
import logo from "../Header/logo.svg";
// import { NavLink } from "react-router-dom";
import { Wrapper, Section } from "./Header.styles.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
// import { setLocalStorage,fetchLocalStorage } from "../../Helpers/helpers.js";
import ClinicProfile from "../../Pages/ClinicProfile/ClinicProfile.js";
import { NavLink, useNavigate } from "react-router-dom";



const Header = ({ className = "" }) => {
  const [User,SetUser]=useState(null);
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    // const LogoutButton = () => {
    
    //   // return (
    //     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    //       Log Out
    //     </button>
    //   // );
    // };
   const { user, isAuthenticated, isLoading } = useAuth0();//admin

//     useEffect(()=>{

//     const Profile = () => {
//       const { user, isAuthenticated, isLoading } = useAuth0();//admin
//       console.log(user);
//       if (isAuthenticated && user.sub === process.env.REACT_APP_ADMIN_SUB){
//         // SHOULD REDIRECT ME TO THE ADMIN PAGE
//         console.log("Take me to Admin Page");
// setLocalStorage({key:'type',value:'admin'})
//       }
//       else if(isAuthenticated){      setLocalStorage({key:'type',value:'clinic'})

//       }//clinic
//       else{     setLocalStorage({key:'type',value:'user'})

//       }//user
//       if (isLoading) {
//         return <div>Loading ...</div>;
//       }
    
//       // return (
//       //   isAuthenticated && (
//       //     <div>
//       //       <img src={user.picture} alt={user.name} />
//       //       <h2>{user.name}</h2>
//       //       <p>{user.email}</p>
//       //     </div>
//       //   )
//       // );
//     };

//       Profile();

//     },[])
useEffect(()=>{
  SetUser(user)

},[user,isAuthenticated])
const navigate = useNavigate()
console.log(user);
  
  return (
    <Wrapper>
      <Section>
        <section className="logo">
          <img src={logo} width="3vw" height="3vw"></img>
        </section>
        <nav className="links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
{isAuthenticated?    <a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</a>        :<a onClick={() => loginWithRedirect()}>Log In</a>}
         


            </li>
            <li>
              {User?user.nickname==='admin'?  <NavLink to={"/CreateClinic"}> CreateClinic</NavLink>:null:null}
              {User?user.nickname!=='admin'?  <NavLink to={"/Profile"}> Profile</NavLink>:null:null}


              {/* {console.log(user)} */}


            </li>
          </ul>
        </nav>
      </Section>
    </Wrapper>
  );
};

export default Header;
