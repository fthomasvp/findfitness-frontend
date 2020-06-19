import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';

import Footer from '../Footer';

const MainLayout = ({ menuArea: Menu, mainArea: MainContent }) => {
  return (
    <Container maxWidth="xl">
      <Menu />
      <MainContent />
      <Footer />
    </Container>
  );
};

MainLayout.propTypes = {
  menuArea: PropTypes.func.isRequired,
  mainArea: PropTypes.func.isRequired,
};

export default MainLayout;
