import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './index.css';

class Search extends Component {
  componentDidMount() {
    if(this.input) {this.input.focus();}
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <TextField
          floatingLabelText="Search anything!"
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
          className='inputText'
        />
        <RaisedButton type="submit" primary label={children} />
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Search;
