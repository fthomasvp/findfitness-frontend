import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

const SButton = props => {
  const { children } = props;

  return <Button {...props}>{children}</Button>;
};

SButton.propTypes = {
  children: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default SButton;
