import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Page from './Page';

configure({ adapter: new Adapter() });

describe('Page', () => {

	const props = {
		value: 'redux',
		onChange: jest.fn(),
		onSubmit: jest.fn(),
		isError: false,
		error: {},
		list: [],
		onDismiss: jest.fn(),
		isLoading: false,
		onClick: jest.fn(),
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Page {...props}/>, div);
	});

	test('has a valid snapshot', () => {
		const component = shallow(<Page />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});
