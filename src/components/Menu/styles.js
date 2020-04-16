import Styled from 'styled-components';

export const SMenuOption = Styled.div`
  width: calc(100% - 10px);
  height: 50px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
  margin: 10px;
  background-color: ${({ secondary }) => (secondary ? 'none' : 'gray')};
  border: ${({ secondary }) => (secondary ? '1px solid #ABABAB' : '')};

  &:hover {
    cursor: pointer;
    color: white;
  }
`;
