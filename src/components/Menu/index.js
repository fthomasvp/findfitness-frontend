import React from 'react';
import { SMenuOption } from './styles';
import STextLink from '../TextLink';

const Menu = () => {
  return (
    <>
      <div>
        <SMenuOption>
          <STextLink to="/studentgroup">Aulas</STextLink>
        </SMenuOption>
        <SMenuOption>
          <STextLink to="/chat">Chat</STextLink>
        </SMenuOption>
        <SMenuOption>
          <STextLink to="/exercise">Exercícios</STextLink>
        </SMenuOption>
        <SMenuOption>
          <STextLink to="/specialization">Especializações</STextLink>
        </SMenuOption>
      </div>
      <div style={{ width: '80%' }}>
        <SMenuOption secondary>
          <STextLink to="/">Sair</STextLink>
        </SMenuOption>
      </div>
    </>
  );
};

export default Menu;
