import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<App />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
