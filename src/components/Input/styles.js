import Styled from 'styled-components';

export const Input = Styled.input`
  height: ${({ height }) => height || '40px'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ padding }) => padding || '5px'};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  font-size: ${({ fontSize }) => fontSize || 'medium'};
`;
