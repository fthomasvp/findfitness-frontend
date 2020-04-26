import React from 'react';
import PropTypes from 'prop-types';
import {
  SContainer,
  SContainerUpside,
  SContainerUpsideLeft,
  SContainerProfile,
  SContainerMenu,
  SContainerAside,
  SContainerFooter,
} from './styles';
import Profile from '../Profile';
import Footer from '../Footer';

const MainLayout = ({ menuArea: Menu, asideArea: Page }) => {
  return (
    <SContainer>
      <SContainerUpside>
        <SContainerUpsideLeft>
          <SContainerProfile>
            <Profile />
          </SContainerProfile>
          <SContainerMenu>
            <Menu />
          </SContainerMenu>
        </SContainerUpsideLeft>
        <SContainerAside>
          <Page />
        </SContainerAside>
      </SContainerUpside>
      <SContainerFooter>
        <Footer />
      </SContainerFooter>
    </SContainer>
  );
};

MainLayout.propTypes = {
  menuArea: PropTypes.func.isRequired,
  asideArea: PropTypes.func.isRequired,
};

export default MainLayout;
