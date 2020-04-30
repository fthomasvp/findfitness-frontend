import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './styles';

const SLabel = props => {
  const { children, htmlFor } = props;

  return (
    <Label htmlFor={htmlFor} {...props}>
      {children}
    </Label>
  );
};

SLabel.propTypes = {
  children: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  textAlign: PropTypes.string,
  color: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default SLabel;
