import React, { Component } from 'react';
import logo from '../../logo.svg';
import './index.css';

import fetch from 'isomorphic-fetch';
import { compose } from 'recompose';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';
import Table from '../Table';
import Button from '../Button';
import Search from '../Search';

const updateSearchTopStoriesState = (hits, page) =>
  (prevState) => {
    const {searchKey, results} = prevState;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    return {
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      },
      isLoading: false,
    };
  };

const updateResultsStateOnDismiss = (id) =>
  (prevState) => {
    const {searchKey, results} = prevState;
    const {hits, page} = results[searchKey];
    const isNotID = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotID);

    return {
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    };
  }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({isLoading: true});
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({error: e}));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    const {searchTerm } = this.state;
    this.setState({searchKey: searchTerm});

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onDismiss(id) {
    this.setState(updateResultsStateOnDismiss(id));
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Hacker News with React</h1>
        </header>
        <br />
        <div className="page">
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              <spam>Search </spam>
            </Search>
          </div>

          <EnhancedTableWithConditionalRendering
            error={error}
            list={list}
            onDismiss={this.onDismiss}
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page+1)}
            buttonText="More"
          />
        </div>
      </div>
    );
  }
}

const EnhancedTable = ({error,list,onDismiss,isLoading,onClick,buttonText}) =>
  <div>
    <TableWithError
      error={error}
      list={list}
      onDismiss={onDismiss}
    />
  </div>

const Loading = () =>
  <div className="loader loader--style1" title="0">
    <svg id="loader-1" width="40px" height="40px">
      <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"/>
      </path>
    </svg>
  </div>

const withLoading = (Component) =>
  ({isLoading, ...rest}) =>
    isLoading
    ? <Loading />
    : <Component {...rest} />

const withPaginated = (Component) =>
  ({isLoading, onClick, buttonText, ...rest}) =>
    <div>
      <Component {...rest} />

      <div className="interactions">
        <ButtonWithLoading
          isLoading={isLoading}
          onClick={onClick}
        >
          {buttonText}
        </ButtonWithLoading>
      </div>
    </div>

const ButtonWithLoading = withLoading(Button);

const withError = (Component) =>
  ({error, ...rest}) =>
    error
    ? <div className="interactions">
      <p>Something went wrong.</p>
    </div>
    : <Component {...rest} />

const TableWithError = withError(Table);

const EnhancedTableWithConditionalRendering = compose(
  withPaginated
)(EnhancedTable);

export default App;

export {
  Button,
  Search,
  Table,
};
