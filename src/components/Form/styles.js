import Styled from 'styled-components';

export const Form = Styled.form`
  height: ${({ height }) => height || '100vh'};
  display: flex;
  flex-flow: ${({ flexFlow }) => flexFlow || 'column wrap'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-evenly'};
  margin: ${({ margin }) => margin || '5px'};
`;
