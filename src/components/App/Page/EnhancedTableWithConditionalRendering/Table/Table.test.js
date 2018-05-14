import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Table from './index';

configure({ adapter: new Adapter() });

describe('Table', () => {

	const props = {
		list: [
			{
				'title': 'Things to learn in React before using Redux',
				'url': 'https://www.robinwieruch.de/learn-react-before-using-redux/',
				'author': 'callumlocke',
				'points': 370,
				'num_comments': 104,
				'_tags': [
					'story',
					'author_callumlocke',
					'story_14811577'
				],
				'objectID': '14811577',
			},
			{
				'title': 'Show HN: ORY Editor – A rich editor for the browser, built with React and Redux',
				'url': 'https://github.com/ory/editor?branch=master',
				'author': 'jswizzard',
				'points': 369,
				'num_comments': 98,
				'_tags': [
					'story',
					'author_jswizzard',
					'story_14417340',
					'show_hn'
				],
				'objectID': '14417340',
			},
			{
				'title': 'A SoundCloud client in React and Redux',
				'url': 'http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/',
				'author': 'rwieruch',
				'points': 253,
				'num_comments': 69,
				'_tags': [
					'story',
					'author_rwieruch',
					'story_11890229'
				],
				'objectID': '11890229',
			},
			{
				'title': 'Systemd redux: The end of Linux',
				'url': 'http://blog.lusis.org/blog/2014/11/20/systemd-redux/',
				'author': 'bcantrill',
				'points': 235,
				'num_comments': 463,
				'_tags': [
					'story',
					'author_bcantrill',
					'story_8639317'
				],
				'objectID': '8639317',
			}
		]
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table { ...props } />, div);
	});

	test('has a valid snapshot', () => {
		const component = render(<Table { ...props } />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});

	it('shows two items in list', () => {
		const element = mount(<Table { ...props } />);
		expect(element.find('ExpansionPanel').length).toBe(4);
	});

});
