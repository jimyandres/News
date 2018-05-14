import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Root from './Root';

configure({ adapter: new Adapter() });

describe('Root', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Root />, div);
		// ReactDOM.unmountComponentAtNode(div);
	});

	test('has a valid snapshot', () => {
		const component = shallow(<Root />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});
