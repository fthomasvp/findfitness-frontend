import React from 'react';
import {
  SContainer,
  SContainerDownside,
  SContainerUpside,
  SContainerUpsideLeft,
  SContainerUpsideLeftProfile,
  SContainerUpsideLeftMenu,
  SContainerUpsideRight,
} from './styles';

const Home = () => {
  return (
    <SContainer>
      <SContainerUpside>
        <SContainerUpsideLeft>
          <SContainerUpsideLeftProfile></SContainerUpsideLeftProfile>
          <SContainerUpsideLeftMenu></SContainerUpsideLeftMenu>
        </SContainerUpsideLeft>
        <SContainerUpsideRight></SContainerUpsideRight>
      </SContainerUpside>
      <SContainerDownside></SContainerDownside>
    </SContainer>
  );
};

export default Home;
