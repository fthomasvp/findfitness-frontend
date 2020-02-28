import Styled from 'styled-components';

export const Button = Styled.button`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  padding: ${({ padding }) => padding || '5px'};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  align-self: ${({ alignSelf }) => alignSelf || 'center'};
  margin-top: ${({ marginTop }) => marginTop || '30px'};
  font-weight: bold;
  color: ${({ color }) => color || 'white'};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
`;
