import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});

	it('calls componentDidMount and updates the state', () => {
		jest.spyOn(App.prototype, 'componentDidMount');
		const wrapper = shallow(<App />);
		expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
		expect(wrapper.state().searchKey).toEqual('redux');
	});

	test('has a valid snapshot', () => {
		const component = shallow(<App />);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});
