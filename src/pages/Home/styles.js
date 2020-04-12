import Styled from 'styled-components';

export const SContainer = Styled.section`
  min-width: 1130px;
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

export const SProfileContainer = Styled.section`
  height: calc(20% - 10px);
  display: flex;
  flex-flow: row wrap;
  border-radius: 5px;
  margin: 5px;
  background-color: lightgreen;
`;

export const SProfile = Styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  border-bottom: 1px solid #ABABAB;
  cursor: pointer;

  & img {
    width: 45px;
    height: 45px;
    border-radius: 30px;
    margin-right: 15px;
  }
`;

export const SProfileInformation = Styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 20px;
`;

export const SInformation = Styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const SContainerMenu = Styled.section`
  width: calc(100% - 10px);
  height: calc(50% - 10px);
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
  background-color: ${({ secondary }) => (secondary ? 'none' : 'gray')};
  border: ${({ secondary }) => (secondary ? '1px solid #ABABAB' : '')};

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
  flex-flor: row wrap;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 5px;
  background-color: purple;

  & img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 15px;
  }
`;
