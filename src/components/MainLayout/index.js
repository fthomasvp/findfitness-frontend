import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';

import * as S from './styles';
import Profile from '../Profile';
import Footer from '../Footer';

const MainLayout = ({ menuArea: Menu, mainArea: Page }) => {
  return (
    <Container>
      <S.ContainerUpside>
        <S.ContainerUpsideLeft>
          <S.ContainerProfile>
            <Profile />
          </S.ContainerProfile>
          <S.ContainerMenu>
            <Menu />
          </S.ContainerMenu>
        </S.ContainerUpsideLeft>
        <S.ContainerAside>
          <Page />
        </S.ContainerAside>
      </S.ContainerUpside>
      <S.ContainerFooter>
        <Footer />
      </S.ContainerFooter>
    </Container>
  );
};

MainLayout.propTypes = {
  menuArea: PropTypes.func.isRequired,
  mainArea: PropTypes.func.isRequired,
};

export default MainLayout;
