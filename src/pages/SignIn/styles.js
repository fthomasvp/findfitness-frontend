import Styled from 'styled-components';

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background: linear-gradient(339deg, #00A4EF 10%, rgba(255,150,0,1) 90%);
`;

export const SPanel = Styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-flow: column wrap;
  border: 1px solid lightgray;
  border-radius: 7px;
  padding: 10px;
`;

export const SInputGroup = Styled.div`
  display: flex;
  flex-flow: column wrap;
`;
