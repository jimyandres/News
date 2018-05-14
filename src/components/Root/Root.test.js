import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Root from './Root';

configure({ adapter: new Adapter() });

describe('Root', () => {

	const wrapper = shallow(<Root />);

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Root />, div);
		// ReactDOM.unmountComponentAtNode(div);
	});

	it('renders the MuiThemeProvider component', () => {
		expect(wrapper.find('MuiThemeProvider').length).toBe(1);
	});

	it('renders the App component', () => {
		expect(wrapper.find('App').length).toBe(1);
	});

	test('has a valid snapshot', () => {
		const component = shallow(<Root />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});
