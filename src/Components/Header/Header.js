import "./Header.styles.js";
import logo from "../Header/logo.svg";
// import { NavLink } from "react-router-dom";
import { Wrapper, Section } from "./Header.styles.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


const Header = ({ className = "" }) => {
    const { loginWithRedirect } = useAuth0();
    const LogoutButton = () => {
      const { logout } = useAuth0();
    
      return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
        </button>
      );
    };
    const Profile = () => {
      const { user, isAuthenticated, isLoading } = useAuth0();//admin
      console.log(user);
      if (isAuthenticated && user.sub === process.env.REACT_APP_ADMIN_SUB){
        // SHOULD REDIRECT ME TO THE ADMIN PAGE
        console.log("Take me to Admin Page");
        localStorage.setItem('type', 'admin');

      }
      else if(isAuthenticated){      localStorage.setItem('type', 'clinic');
      }//clinic
      else{      localStorage.setItem('type', 'user');
      }//user
      if (isLoading) {
        return <div>Loading ...</div>;
      }
    
      // return (
      //   isAuthenticated && (
      //     <div>
      //       <img src={user.picture} alt={user.name} />
      //       <h2>{user.name}</h2>
      //       <p>{user.email}</p>
      //     </div>
      //   )
      // );
    };
    useEffect(()=>{

      Profile();

    },[])
  
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
            <a onClick={() => loginWithRedirect()}>Log In</a>;

            </li>
          </ul>
        </nav>
      </Section>
    </Wrapper>
  );
};

export default Header;
