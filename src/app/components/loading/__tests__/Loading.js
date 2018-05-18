import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('should render without issue', () => {
    const component = shallow(<Loading />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should pass color props should still work', () => {
    const component = shallow(<Loading color="grey" />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should apply container style in the loading', () => {
    const component = shallow(
      <Loading containerStyle={{ backgroundColor: 'red' }} />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});