import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

const Button = ({onClick, className, children}) =>
  <FlatButton
    onClick={onClick}
    type="button"
    primary={true}
    fullWidth
  >
    {children}
  </FlatButton>

Button.defaultProps = {
  className: '',
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
