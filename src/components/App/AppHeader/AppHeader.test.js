import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import AppHeader from './AppHeader';

configure({ adapter: new Adapter() });

describe('AppHeader', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AppHeader />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	test('has a valid snapshot', () => {
		const component = shallow(<AppHeader />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});
