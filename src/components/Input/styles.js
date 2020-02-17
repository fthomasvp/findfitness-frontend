import Styled from 'styled-components';

export const Input = Styled.input`
  height: ${({ height }) => height || '20px'};
  padding: ${({ padding }) => padding || '5px'};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
`;
