import Styled from 'styled-components';

export const SInputGroup = Styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const SWrapperFormik = Styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(339deg, #00A4EF 10%, rgba(255,150,0,1) 90%);
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
