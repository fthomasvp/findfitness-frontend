import React from 'react';
import {
  SContainer,
  SContainerFooter,
  SContainerUpside,
  SContainerUpsideLeft,
  SProfile,
  SMenu,
  SMenuOption,
  SContainerUpsideRight,
} from './styles';

const Home = () => {
  return (
    <SContainer>
      <SContainerUpside>
        <SContainerUpsideLeft>
          <SProfile>
            <div>Perfil</div>
          </SProfile>
          <SMenu>
            <SMenuOption>Chat</SMenuOption>
            <SMenuOption>Exercícios</SMenuOption>
            <SMenuOption>Especializações</SMenuOption>
            <SMenuOption>Aulas</SMenuOption>
            <SMenuOption>Logout</SMenuOption>
          </SMenu>
        </SContainerUpsideLeft>
        <SContainerUpsideRight>MAPA</SContainerUpsideRight>
      </SContainerUpside>
      <SContainerFooter>
        Oxentech
      </SContainerFooter>
    </SContainer>
  );
};

export default Home;
