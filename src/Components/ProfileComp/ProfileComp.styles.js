import styled from "styled-components";

export const Container = styled.div`
  background-color: #e0e5da;
  padding: 20px;
  border-radius: 8px;
  width: 80vh;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: #333;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    justify-content: center;

    h3 {
      padding-left: 1rem;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

export const ListItem = styled.li`
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
`;
