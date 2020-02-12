import React from 'react';
import { WrapperLink, SLink } from './styles';
import PropTypes from 'prop-types';

const STextLink = props => {
  const { children, to } = props;

  return (
    <WrapperLink>
      <SLink to={to}>{children}</SLink>
    </WrapperLink>
  );
};

STextLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default STextLink;
