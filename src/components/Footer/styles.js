import Styled from 'styled-components';

export const ContainerFooter = Styled.footer`
  width: calc(100% - 10px);
  height: calc(5% - 10px);
  display: flex;
  flex-flor: row wrap;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 5px;

  & img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 15px;
  }
`;
