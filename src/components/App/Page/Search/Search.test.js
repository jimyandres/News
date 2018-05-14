import React from 'react';
import ReactDOM from 'react-dom';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Search from './index';

configure({ adapter: new Adapter() });

describe('Search', () => {

	const props = {
		onChange: jest.fn(),
		onSubmit: jest.fn(),
	};

	it('render without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Search {...props} >Search</Search>, div);
	});

	test('has a valid snapshot', () => {
		const wrapper = shallow(<Search {...props} >Search</Search>);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
