import Styled from 'styled-components';

export const ContainerUpside = Styled.section`
  width: calc(100% - 10px);
  height: calc(95% - 10px);
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
`;

export const ContainerUpsideLeft = Styled.section`
  width: 20%;
  display: flex;
  flex-flow: column wrap;
`;

export const ContainerProfile = Styled.section`
  height: calc(20% - 10px);
  display: flex;
  flex-flow: row wrap;
  border-radius: 5px;
  margin: 5px;
  background-color: lightgreen;
`;

export const ContainerMenu = Styled.section`
  width: calc(100% - 10px);
  height: calc(50% - 10px);
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  margin: 5px;
`;

export const ContainerAside = Styled.section`
  width: calc(80% - 10px);
  border-radius: 5px;
  margin: 5px;
  background-color: brown;
`;
