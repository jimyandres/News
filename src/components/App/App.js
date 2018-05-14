import React, { Component } from 'react';
import AppHeader from './AppHeader';
import './App.css';
import Page from './Page';

import fetch from 'isomorphic-fetch';

import {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HPP,
} from '../../constants';

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
			isError: false,
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
	};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: null,
			isError: false,
			isLoading: false,
		};

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
			.catch(e => this.setState({error: e, isError:true, isLoading:false}));
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
			isError,
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
				<AppHeader />
				<br />
				<Page
					value={searchTerm}
					onChange={this.onSearchChange}
					onSubmit={this.onSearchSubmit}
					isError={isError}
					error={error}
					list={list}
					onDismiss={this.onDismiss}
					isLoading={isLoading}
					onClick={() => this.fetchSearchTopStories(searchKey, page+1)}
				/>
			</div>
		);
	}
}

export default App;
