import Styled from 'styled-components';

export const SInputGroup = Styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(40, 20, 150, 1), rgba(120, 70, 255, 0.9));
`;

export const SPanel = Styled.div`
  width: 500px;
  height: 80vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  border: 1px solid lightgray;
  border-radius: 7px;
  padding: 10px;
`;

export const SToggleButtonGroup = Styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const SToggleButton = Styled.button`
  width: ${({ width }) => width || '200px'};
  border-radius: 30px;
`;
