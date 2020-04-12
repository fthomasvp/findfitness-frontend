import React from 'react';
import {
  SContainer,
  SContainerFooter,
  SContainerUpside,
  SContainerUpsideLeft,
  SProfile,
  SContainerMenu,
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
          <SContainerMenu>
            <div>
              <SMenuOption>Aulas</SMenuOption>
              <SMenuOption>Chat</SMenuOption>
              <SMenuOption>Exercícios</SMenuOption>
              <SMenuOption>Especializações</SMenuOption>
            </div>
            <div>
              <SMenuOption>Logout</SMenuOption>
            </div>
          </SContainerMenu>
        </SContainerUpsideLeft>
        <SContainerUpsideRight>
          <div>MAPA</div>
        </SContainerUpsideRight>
      </SContainerUpside>
      <SContainerFooter>
        <div>Oxentech</div>
      </SContainerFooter>
    </SContainer>
  );
};

export default Home;
