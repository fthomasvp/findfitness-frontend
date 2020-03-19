import Styled from 'styled-components';

export const ErrorMessageInput = Styled.span`
  color: ${({ color }) => color || 'yellow'};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  margin-top: ${({ marginTop }) => marginTop || '5px'};
  font-size: 13px;
`;
