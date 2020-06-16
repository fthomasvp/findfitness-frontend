import Styled from 'styled-components';

export const Panel = Styled.div`
  // height: 700px;
  min-height: 625px;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  padding: 10px;
`;

export const PanelTitle = Styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const PanelContent = Styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  padding: 10px;
`;

export const PanelActions = Styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
`;
