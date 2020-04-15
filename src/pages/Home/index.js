import React from 'react';
import {
  SContainer,
  SContainerFooter,
  SContainerUpside,
  SContainerUpsideLeft,
  SProfileContainer,
  SProfile,
  SProfileInformation,
  SInformation,
  SContainerMenu,
  SMenuOption,
  SContainerUpsideRight,
} from './styles';
import user from '../../assets/images/user.webp';
import oxentechLogo from '../../assets/images/oxentech-bird-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import STextLink from '../../components/TextLink';

const Home = () => {
  return (
    <SContainer>
      <SContainerUpside>
        <SContainerUpsideLeft>
          <SProfileContainer>
            <SProfile>
              <img src={user} alt="User" />
              <p>Fellipe Thomás</p>
            </SProfile>
            <SProfileInformation>
              <SInformation>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ height: '45px', marginRight: '5px' }}
                />
                <p>4.5</p>
              </SInformation>

              <SInformation>
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ height: '45px', marginRight: '5px' }}
                />
                <p>Qtd aulas</p>
              </SInformation>
            </SProfileInformation>
          </SProfileContainer>
          <SContainerMenu>
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
          </SContainerMenu>
        </SContainerUpsideLeft>
        <SContainerUpsideRight>
          <div>MAPA</div>
        </SContainerUpsideRight>
      </SContainerUpside>
      <SContainerFooter>
        <img src={oxentechLogo} alt="Logo da Empresa Oxentech" />
      </SContainerFooter>
    </SContainer>
  );
};

export default Home;
