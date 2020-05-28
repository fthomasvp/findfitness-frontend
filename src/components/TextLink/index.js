import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { WrapperLink, SLink } from './styles';

const STextLink = props => {
  const { children, to, color } = props;

  return (
    <WrapperLink>
      <SLink to={to} color={color}>
        <Typography variant="subtitle1">{children}</Typography>
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
