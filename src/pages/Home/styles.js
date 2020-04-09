import Styled from 'styled-components';

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  background-color: lightblue;
`;

export const SContainerUpside = Styled.section`
  width: 100%;
  height: 95%;
  display: flex;
  flex-flow: row wrap;
  background-color: yellow;
`;

export const SContainerUpsideLeft = Styled.section`
  width: 20%;
  display: flex;
  flex-flow: column wrap;
  background-color: white;
`;

export const SProfile = Styled.section`
  height: 30%;
  display: flex;
  flex-flow: row wrap;
  background-color: lightgreen;
`;

export const SMenu = Styled.section`
  width: 100%;
  height: 70%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;
  background-color: orange;
`;

export const SMenuOption = Styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  background-color: gray;
`;

export const SContainerUpsideRight = Styled.section`
  width: 80%;
  background-color: brown;
`;

export const SContainerFooter = Styled.section`
  width: 100%;
  height: 5%;
  display: flex;
  background-color: red;
`;
