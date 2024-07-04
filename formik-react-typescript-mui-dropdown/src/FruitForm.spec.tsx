import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import FruitForm from './FruitForm';

describe('FruitForm', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = mount(<FruitForm />);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders a dropdown with correct options', () => {
    const dropdown = wrapper.find('#fruit-select');
    expect(dropdown.exists()).toBeTruthy();

    // Verify dropdown options
    const options = dropdown.find('MenuItem');
    expect(options).toHaveLength(5); // Assuming 5 options based on your example
    expect(options.at(0).prop('value')).toEqual('1');
    expect(options.at(0).text()).toEqual('Apple');
    // Add assertions for other options as needed
  });

  it('hides Blueberry and Strawberry when checkbox is unticked', () => {
    // Simulate checkbox untick
    wrapper
      .find('#hide-fruits-checkbox')
      .simulate('change', { target: { checked: false } });

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
