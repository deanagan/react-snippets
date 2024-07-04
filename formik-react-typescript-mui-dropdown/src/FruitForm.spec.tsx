import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import FruitForm, { StyledField } from './FruitForm';
import { MenuItem } from '@mui/material';

describe('FruitForm', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = mount(<FruitForm />);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders a dropdown with correct options', () => {
    const dropdown = wrapper.find('div[role="combobox"][id="fruit-select"]');

    // and then simulate the mousedown event sending the button:0 in the event object

    dropdown.simulate('mousedown', { button: 0 }); // button: 0 is required
    //dropdown.simulate('click'); ===>> Does not work
    wrapper.update();

    const options = wrapper.find('div[role="presentation"]');
    expect(options.exists()).toBeTruthy();
    const items = options.find('li[role="option"]');

    expect(items).toHaveLength(6);
    expect(items.at(1).prop('data-value')).toEqual('1');
    expect(items.at(1).text()).toEqual('Apple');
  });

  it('hides Blueberry and Strawberry when checkbox is unticked', () => {
    // Simulate checkbox untick
    wrapper
      .find('input[id="hide-berries-checkbox"]')
      .simulate('change', { target: { checked: true } });

    // Verify that Blueberry and Strawberry are hidden
    const blueberryOption = wrapper.find('MenuItem[value="4"]');
    const strawberryOption = wrapper.find('MenuItem[value="5"]');
    expect(blueberryOption.exists()).toBeFalsy();
    expect(strawberryOption.exists()).toBeFalsy();
  });

  // Add more test cases as needed

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });
});
