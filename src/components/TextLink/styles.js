import Styled from 'styled-components';
import { Link } from 'react-router-dom';

export const WrapperLink = Styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const SLink = Styled(Link)`
  font-size: 1.1em;
  color: ${({ color }) => color || '#F8F8FF'};
  text-decoration: none;

  &:hover {
    color: lightblue;
  }
`;
