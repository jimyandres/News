import React, { Component } from 'react';
import Button from '../Button';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './index.css';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '66.66%',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column2: {
    flexBasis: '66.66%',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
      expanded: null,
    };

    this.onSort = this.onSort.bind(this);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({sortKey, isSortReverse});
  }

  render () {
    const {
      list,
      onDismiss,
      classes
    } = this.props;

    const {
      sortKey,
      isSortReverse,
      expanded,
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
          <ExpansionPanel
            key={item.objectID}
            expanded={expanded === item.objectID}
            onChange={this.handleChange(item.objectID)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon  />}>
              <Typography className={classes.heading}>{ item.title }</Typography>
              <Typography className={classes.secondaryHeading}>by {item.author}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.column2}>
                {item._tags.map((tag, key) =>
                  <Chip key={key} label={tag} className={classes.chip} />
                )}
              </div>
              <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="caption">
                  <b>{ item.title }</b><br /><br />
                  <b>Points:</b> {item.points}<br />
                  <b>Comments:</b> {item.num_comments}<br /><br />
                  <a href={item.url} className={classes.link}>
                    See more
                  </a>
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" color="primary" onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
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

export default withStyles(styles)(Table);
