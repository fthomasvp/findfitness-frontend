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

export const SContainerUpsideLeftProfile = Styled.section`
  height: 30%;
  display: flex;
  flex-flow: row wrap;
  background-color: lightgreen;
`;

export const SContainerUpsideLeftMenu = Styled.section`
  height: 70%;
  display: flex;
  flex-flow: column wrap;
  background-color: orange;
`;

export const SContainerUpsideRight = Styled.section`
  width: 80%;
  display: flex;
  flex-flow: row nowrap;
  background-color: brown;
`;

export const SContainerDownside = Styled.section`
  width: 100%;
  height: 5%;
  display: flex;
  background-color: red;
`;
