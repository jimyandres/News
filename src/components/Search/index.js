import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/Button';
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
      <form onSubmit={onSubmit} style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap',
      justifyContent: 'space-around'}}>
        <TextField
          label="Search Anything!"
          style={{margin: '0 2em', width: '15em'}}
          placeholder="Redux"
          value={value}
          onChange={onChange}
          inputRef={(node) => { this.input = node; }}
        />
        <RaisedButton size='large' color="primary" variant="raised" type="submit" style={{margin: '1em 0'}}>
          {children}
        </RaisedButton>
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
