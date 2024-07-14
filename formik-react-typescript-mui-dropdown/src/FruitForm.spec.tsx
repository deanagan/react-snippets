import React from 'react';
import { mount } from 'enzyme';
import FruitForm from './FruitForm';
import { type ReactWrapperType } from './types';
import { ENTER_NUMBER_FORMAT } from './constants';

function clickItemFromDropdown(wrapper: ReactWrapperType, itemNumber: number) {
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

  // Select 3rd item
  items.at(itemNumber).simulate('click');
  wrapper.update();
}
describe('FruitForm', () => {
  let wrapper: ReactWrapperType;

  beforeEach(() => {
    wrapper = mount(<FruitForm />);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders a dropdown with correct options', () => {
    clickItemFromDropdown(wrapper, 3);
    const dropdownValue = wrapper.find(
      'div[role="combobox"][id="fruit-select"]',
    );

    expect(dropdownValue.text()).toBe('Grapes');
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

  it('shows a helper text of maximum 50 for a banana', () => {
    clickItemFromDropdown(wrapper, 2);

    wrapper
      .find('input[id="textbox"]')
      .simulate('change', { target: { value: 85 } });

    const helperText = wrapper.find('label[id="textbox-label"]');
    const text = helperText.text();
    expect(helperText.exists()).toBeTruthy();
    const expectedText = ENTER_NUMBER_FORMAT.replace('${0}', '50');
    expect(text).toBe(expectedText);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });
});
