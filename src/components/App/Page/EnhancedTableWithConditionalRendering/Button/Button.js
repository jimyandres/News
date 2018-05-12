import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import MaterialButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const style = {
  label: {
    textDecoration: 'underline overline',
  },
};

const Button = ({onClick, className, children, active = false, classes, ...rest}) =>
  <MaterialButton
    onClick={onClick}
    color='primary'
    classes={{ label: active ? classes.label : ''}}
    {...rest}
  >
    {children}
  </MaterialButton>

Button.defaultProps = {
  className: '',
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default withStyles(style)(Button);
