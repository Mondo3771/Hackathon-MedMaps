import styled from "styled-components";

export const Article = styled.div`
  /* height: 10vh;
    width: 100%; */
  margin-bottom: 4px;
  padding-left: 3rem;
  display: flex;
  min-height: 8vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border: 2px solid #f4f4f4;
  align-items: center;
  margin: 10px 0;
  border-radius: 10px;
  color: #555;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #ccd9c5; /* Change background color on hover */
    transform: scale(1.02); /* Slightly scale up on hover */
  }
`;
export const Wrapper = styled.div`
  overflow-y: auto;
  height: 50vh;

  h1 {
    padding-left: 1rem;
  }
`;
