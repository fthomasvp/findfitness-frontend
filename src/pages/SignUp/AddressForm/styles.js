import Styled from 'styled-components';

export const SInputGroup = Styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const SContainer = Styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(214deg, rgba(114, 244, 149, 0.27) 0%, rgba(114, 244, 149, 0.27) 37%,rgba(126, 221, 156, 0.27) 37%, rgba(126, 221, 156, 0.27) 48%,rgba(137, 197, 162, 0.27) 48%, rgba(137, 197, 162, 0.27) 49%,rgba(149, 174, 169, 0.27) 49%, rgba(149, 174, 169, 0.27) 59%,rgba(160, 151, 175, 0.27) 59%, rgba(160, 151, 175, 0.27) 60%,rgba(172, 128, 182, 0.27) 60%, rgba(172, 128, 182, 0.27) 86%,rgba(183, 104, 188, 0.27) 86%, rgba(183, 104, 188, 0.27) 95%,rgba(195, 81, 195, 0.27) 95%, rgba(195, 81, 195, 0.27) 100%),linear-gradient(304deg, rgba(100, 114, 232, 0.27) 0%, rgba(100, 114, 232, 0.27) 18%,rgba(126, 135, 203, 0.27) 18%, rgba(126, 135, 203, 0.27) 23%,rgba(153, 156, 173, 0.27) 23%, rgba(153, 156, 173, 0.27) 44%,rgba(179, 178, 144, 0.27) 44%, rgba(179, 178, 144, 0.27) 62%,rgba(206, 199, 114, 0.27) 62%, rgba(206, 199, 114, 0.27) 98%,rgba(232, 220, 85, 0.27) 98%, rgba(232, 220, 85, 0.27) 100%),linear-gradient(169deg, rgb(47, 132, 199) 0%, rgb(47, 132, 199) 2%,rgb(47, 130, 208) 2%, rgb(47, 130, 208) 44%,rgb(47, 127, 218) 44%, rgb(47, 127, 218) 48%,rgb(47, 125, 227) 48%, rgb(47, 125, 227) 77%,rgb(47, 122, 237) 77%, rgb(47, 122, 237) 78%,rgb(47, 120, 246) 78%, rgb(47, 120, 246) 100%);
`;

export const SPanel = Styled.div`
  width: 500px;
  height: 80vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  border: 1px solid lightgray;
  border-radius: 7px;
  padding: 10px;
`;
