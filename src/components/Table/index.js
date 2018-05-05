import React, { Component } from 'react';
import Button from '../Button';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({sortKey, isSortReverse});
  }

  render () {
    const {
      list,
      onDismiss,
    } = this.props;

    const {
      sortKey,
      isSortReverse,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <SortList
            sortKeys={[
              {name: 'Title', className:largeColumn},
              {name: 'Author', className:midColumn},
              {name: 'Comments', className:smallColumn},
              {name: 'Points', className:smallColumn},
            ]}
            onSort={this.onSort}
            activeSortKey={sortKey}
            isSortReverse={isSortReverse}
          />
          <FlatButton primary style={smallColumn}>
            Archive
          </FlatButton>
        </div>
        { reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{ item.title }</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  list: PropTypes.array,
  sortKey: PropTypes.string,
  onSort: PropTypes.func,
  onDismiss: PropTypes.func,
};

const SortList = ({sortKeys, ...rest}) => {
  return sortKeys.map(key =>
    <span key={key.name} style={key.className}>
      <Sort
        sortKey={key.name.toUpperCase()}
        {... rest}
      >
        {key.name}
      </Sort>
    </span>
  );
}

const Sort = ({sortKey, onSort, activeSortKey, isSortReverse, children}) => {
  const sortClass = classNames(
    'button-inline',
    {'button-active': sortKey === activeSortKey}
  );
  const arrowSort = classNames(
    {'arrow arrow-up': sortKey === activeSortKey && !isSortReverse},
    {'arrow arrow-down': sortKey === activeSortKey && isSortReverse}
  );
  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}<div className={arrowSort}></div>
    </Button>
  );
}


const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

export default Table;
