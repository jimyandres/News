import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {

  const somefunc = () => "something";

  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={somefunc}>Testing</Button>, div);
  });

  test('has a valid snapshot', () => {
    const component =  renderer.create(
      <Button onClick={somefunc}>Testing</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render children when passed in', () => {
    const element = shallow(
      <Button onClick={somefunc}>
        Search
      </Button>
    );

    expect(element.contains('Search')).toEqual(true);
  });
});
