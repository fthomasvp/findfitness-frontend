import Styled from 'styled-components';

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  padding: 10px;
  background-color: lightblue;
`;

export const SContainerUpside = Styled.section`
  width: calc(100% - 10px);
  height: calc(95% - 10px);
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
  // background-color: yellow;
`;

export const SContainerUpsideLeft = Styled.section`
  width: 20%;
  display: flex;
  flex-flow: column wrap;
  // background-color: white;
`;

export const SProfile = Styled.section`
  height: calc(30% - 10px);
  display: flex;
  flex-flow: row wrap;
  border-radius: 5px;
  margin: 5px;
  background-color: lightgreen;
`;

export const SContainerMenu = Styled.section`
  width: calc(100% - 10px);
  height: calc(70% - 10px);
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-content: center;
  border-radius: 5px;
  margin: 5px;
  background-color: orange;
`;

export const SMenuOption = Styled.div`
  width: calc(100% - 10px);
  height: 50px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
  margin: 10px;
  background-color: gray;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;

export const SContainerUpsideRight = Styled.section`
  width: calc(80% - 10px);
  border-radius: 5px;
  margin: 5px;
  background-color: brown;
`;

export const SContainerFooter = Styled.footer`
  width: calc(100% - 10px);
  height: calc(5% - 10px);
  display: flex;
  border-radius: 5px;
  margin: 5px;
  background-color: purple;
`;
