import Styled from 'styled-components';

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(339deg, rgba(141,10,255,1) 16%, rgba(0,151,255,1) 47%, rgba(141,10,255,1) 90%);
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

export const SForm = Styled.form`
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  margin: 5px;
`;

export const SInputGroup = Styled.div`
  display: flex;
  flex-flow: column wrap;
`;
