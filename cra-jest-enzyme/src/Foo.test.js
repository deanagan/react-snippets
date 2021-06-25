import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Foo from './Foo';
import { FooFunc } from './Foo';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<Foo />).contains(<div className="foo">Bar</div>)).toBe(true);
  });

  it('should be selectable by class "foo"', function() {
    expect(shallow(<Foo />).is('.foo')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Foo />).find('.foo').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<Foo />).text()).toEqual('Bar');
  });

  it('should return false', function() {

    const wrapper = shallow(<Foo />);
    const spied = jest.spyOn(wrapper.instance(), 'isValid');
    spied.mockReturnValue(false);
    //expect(x.instance()).to.be.instanceOf(Foo);
    console.log(wrapper.text());
    //expect(x.instance().text()).toEqual('BarBaz');
  });


//   it('should return false func app', function() {
//     let x = mount(<FooFunc/>);
//     expect(x.text()).toEqual('Bar');
//   });

  // it('should return false func app2', function() {
  //   let x = mount(<FooFunc/>);
  //   var tempProps = {...x.props};
  //   tempProps.isValid = jest.fn().mockReturnValue(false);
  //   //jest.spyOn('FooFunc', 'isValid');
  //   x.update();
  //   expect(x.text()).toEqual('BarBaz');
  // });
});
