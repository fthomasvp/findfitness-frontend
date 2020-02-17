import React from 'react';
import { WrapperLink, SLink } from './styles';
import PropTypes from 'prop-types';

const STextLink = props => {
  const { children, to, color } = props;

  return (
    <WrapperLink>
      <SLink to={to} color={color}>
        {children}
      </SLink>
    </WrapperLink>
  );
};

STextLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default STextLink;
