import Styled from 'styled-components';

export const Label = Styled.label`
  font-size: ${({ fontSize }) => fontSize || '1.2em'};
  font-weight: bold;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  color: ${({ color }) => color || 'white'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '5px'};
`;
