import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ContentItem from '../ContentItem';

describe('ContentItem Component', () => {
  it('should render without issue', () => {
    const component = shallow(<ContentItem />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should pass title props should still work', () => {
    const component = shallow(<ContentItem title="Title Content" />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should apply title style in the contentitem', () => {
    const component = shallow(
      <ContentItem titleStyle={{ fontSize: 18 }} />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should pass subtitle props should still work', () => {
    const component = shallow(<ContentItem subtitle="Subtitle Content" />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should apply subtitle style in the contentitem', () => {
    const component = shallow(
      <ContentItem subtitleStyle={{ fontSize: 16 }} />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});