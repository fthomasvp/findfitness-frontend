import Styled from 'styled-components';

export const SProfile = Styled.div`
width: 100%;
height: 50%;
display: flex;
justify-content: flex-start;
padding: 20px;
border-bottom: 1px solid #ABABAB;
cursor: pointer;

& img {
  width: 45px;
  height: 45px;
  border-radius: 30px;
  margin-right: 15px;
}
`;

export const SProfileInformation = Styled.div`
width: 100%;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
padding: 20px;
`;

export const SInformation = Styled.div`
display: flex;
flex-flow: row wrap;
`;
