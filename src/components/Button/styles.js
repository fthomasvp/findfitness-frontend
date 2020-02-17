import Styled from 'styled-components';

export const Button = Styled.button`
  width: ${({ width }) => width || '160px'};
  height: ${({ height }) => height || '35px'};
  padding: ${({ padding }) => padding || '5px'};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  align-self: ${({ alignSelf }) => alignSelf || 'center'};
  font-weight: bold;
`;
