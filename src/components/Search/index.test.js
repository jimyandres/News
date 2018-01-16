import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
  const somefunc = () => "something";

  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search onChange={somefunc} onSubmit={somefunc}>Search</Search>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search onChange={somefunc} onSubmit={somefunc}>Search</Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});
