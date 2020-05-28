import Styled from 'styled-components';

export const SContainer = Styled.section`
width: 100vw;
height: 100vh;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
background-image: linear-gradient(312deg, rgba(107, 107, 107, 0.01) 0%, rgba(107, 107, 107, 0.01) 25%,rgba(140, 140, 140, 0.01) 25%, rgba(140, 140, 140, 0.01) 50%,rgba(140, 140, 140, 0.01) 50%, rgba(140, 140, 140, 0.01) 75%,rgba(182, 182, 182, 0.01) 75%, rgba(182, 182, 182, 0.01) 100%),linear-gradient(106deg, rgba(23, 23, 23, 0.02) 0%, rgba(23, 23, 23, 0.02) 12.5%,rgba(134, 134, 134, 0.02) 12.5%, rgba(134, 134, 134, 0.02) 25%,rgba(31, 31, 31, 0.02) 25%, rgba(31, 31, 31, 0.02) 37.5%,rgba(134, 134, 134, 0.02) 37.5%, rgba(134, 134, 134, 0.02) 50%,rgba(42, 42, 42, 0.02) 50%, rgba(42, 42, 42, 0.02) 62.5%,rgba(6, 6, 6, 0.02) 62.5%, rgba(6, 6, 6, 0.02) 75%,rgba(13, 13, 13, 0.02) 75%, rgba(13, 13, 13, 0.02) 87.5%,rgba(164, 164, 164, 0.02) 87.5%, rgba(164, 164, 164, 0.02) 100%),linear-gradient(327deg, rgba(104, 104, 104, 0.02) 0%, rgba(104, 104, 104, 0.02) 16.667%,rgba(252, 252, 252, 0.02) 16.667%, rgba(252, 252, 252, 0.02) 33.334%,rgba(79, 79, 79, 0.02) 33.334%, rgba(79, 79, 79, 0.02) 50.001000000000005%,rgba(125, 125, 125, 0.02) 50.001%, rgba(125, 125, 125, 0.02) 66.668%,rgba(84, 84, 84, 0.02) 66.668%, rgba(84, 84, 84, 0.02) 83.33500000000001%,rgba(82, 82, 82, 0.02) 83.335%, rgba(82, 82, 82, 0.02) 100.002%),linear-gradient(107deg, rgba(32, 32, 32, 0.03) 0%, rgba(32, 32, 32, 0.03) 16.667%,rgba(53, 53, 53, 0.03) 16.667%, rgba(53, 53, 53, 0.03) 33.334%,rgba(212, 212, 212, 0.03) 33.334%, rgba(212, 212, 212, 0.03) 50.001000000000005%,rgba(190, 190, 190, 0.03) 50.001%, rgba(190, 190, 190, 0.03) 66.668%,rgba(244, 244, 244, 0.03) 66.668%, rgba(244, 244, 244, 0.03) 83.33500000000001%,rgba(118, 118, 118, 0.03) 83.335%, rgba(118, 118, 118, 0.03) 100.002%),linear-gradient(55deg, rgba(30, 30, 30, 0.03) 0%, rgba(30, 30, 30, 0.03) 16.667%,rgba(90, 90, 90, 0.03) 16.667%, rgba(90, 90, 90, 0.03) 33.334%,rgba(230, 230, 230, 0.03) 33.334%, rgba(230, 230, 230, 0.03) 50.001000000000005%,rgba(94, 94, 94, 0.03) 50.001%, rgba(94, 94, 94, 0.03) 66.668%,rgba(216, 216, 216, 0.03) 66.668%, rgba(216, 216, 216, 0.03) 83%,rgba(5, 5, 5, 0.03) 83.335%, rgba(5, 5, 5, 0.03) 100.002%),linear-gradient(90deg, rgb(197, 58, 221),rgb(117, 45, 206));
`;

export const SPanel = Styled.div`
width: 450px;
height: 700px;
display: flex;
flex-flow: column;
justify-content: space-evenly;
padding: 10px;
`;

export const SPanelTitle = Styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const SPanelContent = Styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  padding: 10px;
`;

export const SPanelActions = Styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
`;
