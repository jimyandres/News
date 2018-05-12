import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import FlatButton from 'material-ui/Button';

const Button = ({onClick, className, children, ...rest}) =>
  <FlatButton
    onClick={onClick}
    color='primary'
    {...rest}
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
