import "./Header.styles.js";
import logo from "../Header/logo.svg";
// import { NavLink } from "react-router-dom";
import { Wrapper, Section } from "./Header.styles.js";

const Header = ({ className = "" }) => {
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
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      </Section>
    </Wrapper>
  );
};

export default Header;
