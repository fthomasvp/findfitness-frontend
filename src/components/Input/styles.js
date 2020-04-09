import Styled from 'styled-components';

export const Input = Styled.input`
  height: ${({ height }) => height || '25px'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ padding }) => padding || '5px'};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
`;
