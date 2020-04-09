import React from 'react';
import PropTypes from 'prop-types';
import { Form } from './styles';

const SForm = props => {
  const { onSubmit } = props;

  return <Form onSubmit={onSubmit} {...props} />;
};

SForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  height: PropTypes.string,
  flexFlow: PropTypes.string,
  justifyContent: PropTypes.string,
  margin: PropTypes.string,
};

export default SForm;
