import styled from "styled-components";

export const Wrapper = styled.header`
  width: 100vw;
  height: 30vw;
  padding: 0;
  flex-direction: row;
  height: auto;
  background-color: #f4f4f4;
  /* margin: 100px; */
`;

export const Section = styled.div`
  /* /* position: fixed; */
  z-index: 9999; */
  width: 100vw;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: row;
  padding-right: 0.2 rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3rem;
    img {
      width: 8vw;
      height: 8vw;
    }
  }

  a {
    font-size: 1.2rem;

    text-decoration: none;
    color: black;
    transition: all 200 ease-in-out;
  }

  ul {
    display: flex;
    padding: 0;
    list-style: none;
    gap: 5rem;
    color: #a1a8b0;
  }

  a:visited {
    color: #a1a8b0;
  }

  li a:hover {
    color: #a3b899;
  }
  .links {
    padding-right: 2rem;
  }

  /* Media query for screens smaller than 768px */
  @media screen and (max-width: 768px) {
    padding: 0.5rem 1rem;

    .logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 20vw;
        height: 20vw;
      }

      a {
        font-size: 0.9rem;
      }

      ul {
        gap: 2rem;
      }
    }
  }
`;
