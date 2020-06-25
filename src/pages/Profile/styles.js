import Styled from 'styled-components';

export const Panel = Styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
`;

export const PanelContent = Styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  padding: 10px;
`;

export const PanelActions = Styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  padding: 10px;
`;
