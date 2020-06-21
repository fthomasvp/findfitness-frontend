import Styled from 'styled-components';

export const Form = Styled.form`
  height: ${({ height }) => height || '100%'};
  display: flex;
  flex-flow: ${({ flexFlow }) => flexFlow || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-evenly'};
  margin: ${({ margin }) => margin || '5px'};
  overflow-y: auto;
`;
