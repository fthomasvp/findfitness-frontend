import Styled from 'styled-components';

export const SContainer = Styled.section`
  min-width: 1130px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  padding: 10px;
`;

export const SContainerUpside = Styled.section`
  width: calc(100% - 10px);
  height: calc(95% - 10px);
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
`;

export const SContainerUpsideLeft = Styled.section`
  width: 20%;
  display: flex;
  flex-flow: column wrap;
`;

export const SContainerProfile = Styled.section`
  height: calc(20% - 10px);
  display: flex;
  flex-flow: row wrap;
  border-radius: 5px;
  margin: 5px;
  background-color: lightgreen;
`;

export const SContainerMenu = Styled.section`
  width: calc(100% - 10px);
  height: calc(50% - 10px);
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  margin: 5px;
`;

export const SContainerAside = Styled.section`
  width: calc(80% - 10px);
  border-radius: 5px;
  margin: 5px;
  background-color: brown;
`;

export const SContainerFooter = Styled.footer`
  width: calc(100% - 10px);
  height: calc(5% - 10px);
  display: flex;
  flex-flor: row wrap;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 5px;

  & img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 15px;
  }
`;