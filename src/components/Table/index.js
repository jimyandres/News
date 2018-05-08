import React, { Component } from 'react';
import Button from '../Button';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
              {name: 'Title'},
              {name: 'Author'},
              {name: 'Comments'},
              {name: 'Points'},
            ]}
            onSort={this.onSort}
            activeSortKey={sortKey}
            isSortReverse={isSortReverse}
          />
        </div>
        { reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span>
              <a href={item.url}>{ item.title }</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
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
    <Sort
      key={key.name}
      sortKey={key.name.toUpperCase()}
      {... rest}
    >
      {key.name}
    </Sort>
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
      style={{minWidth: '12em'}}
    >
      {children}
      <div className='arrowContainer'><div className={arrowSort} /></div>
    </Button>
  );
}

export default Table;
