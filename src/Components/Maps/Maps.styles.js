import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: red;
  height: fit-content;
  width: fit-content;
`;
export const Bottom = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #555;
`;

export const MapCheck = styled.section`
  padding: 2vh;
  width: 60vw;
  height: 8vh;
  display: flex;
  flex-direction: row;

  input {
    border-radius: 5px;
    width: 50vw;
    height: 2vh;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 16px;
    color: #333;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  button {
    border-radius: 9px;
    width: 20vw;
    height: 5vh;
  }

  ::placeholder {
    align-items: center;
    padding-left: 0.2rem;
  }
  .location {
    display: flex;

    flex-direction: row;
    align-items: center;
  }

  .recenter,
  .confirm {
    margin-top: 10px;
  }

  button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    background-color: #a3b899;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }
`;

export const Check = styled.div`
  input {
    box-sizing: border-box;
    -webkit-appearance: none;
    position: relative;
    display: block;
    width: 350px;
    height: 75px;
    margin: 50px auto;
    border: 5px solid #f7f7f5;
    border-radius: 17px;
    cursor: pointer;
    background: white;
  }

  input:after,
  input:before {
    box-sizing: border-box;
    position: absolute;
    left: 5px;
    top: 5px;
    width: 150px;
    height: 55px;
    border: 5px solid;
    border-radius: 12px;
    text-align: center;
    line-height: 42px;
    font-size: 32px;
    transition: all 0.3s ease-out;
  }

  input:before {
    content: "Clinic";
    color: black;
    border-color: black;
    background: #ccd9c5;
  }

  input:after {
    left: auto;
    right: 5px;
    content: "Hospital";
    border-color: black;
    color: black;
    background: #ccd9c5;
    opacity: 0.4;
  }

  input:checked:after {
    opacity: 1;
  }

  input:checked:before {
    opacity: 0.4;
  }
`;
