import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Testing</Button>, div);
  });

  test('has a valid snapshot', () => {
    const component =  renderer.create(
      <Button>Testing</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render children when passed in', () => {
    const element = shallow(
      <Button onClick="something">
        Search
      </Button>
    );

    expect(element.contains('Search')).toEqual(true);
  });
});
