/* eslint-disable no-undef */
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { Builder } from './Builder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter()});

describe('<Builder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Builder onInitIngredients={() => {}} />);
  });

  it('Should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});