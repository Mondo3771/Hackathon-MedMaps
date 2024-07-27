import styled from "styled-components"

export const Wrapper=styled.div`
    background-color: red;
    height: fit-content;
    width: fit-content;

`
export const Bottom=styled.div`
    height: fit-content;
    width: 100%;
display: flex;
justify-content: space-between;
`

export const Check=styled.div`

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
      color: #d93816;
      border-color: #ff6645;
      background: #ffddcc;
    }

    input:after {
      left: auto;
      right: 5px;
      content: "Hospital";
      border-color: #34a84d;
      color: #30ba4e;
      background: #ccffbb;
      opacity: 0.4;
    }

    input:checked:after {
      opacity: 1;
    }

    input:checked:before {
      opacity: 0.4;
    }

`
