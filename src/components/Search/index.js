import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
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
          label="Search Anything!"
          style={{marginRight: '2em', width: '20em'}}
          placeholder="Redux"
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
        />
        <FlatButton size='large' color="primary" variant="raised" type="submit">
          aaaa
        </FlatButton>
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
