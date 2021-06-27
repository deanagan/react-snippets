import React, { useState, useEffect } from 'react';
import { getReturn } from './ReturnHelp';
const propTypes = {};

const defaultProps = {};

class Foo extends React.Component {

  isValid() {
    return true;
  };

  render() {
    return (
      <div className="foo">
        Bar{this.isValid() ? "" : "Baz"}
      </div>
    );
  }
}

export const FooFunc = () => {
  const isValid = () => {
    return true;
  }
  return (
    <div className="foo">
      Bar{isValid() ? "" : "Baz"}
    </div>
  );
}

export const Lighting = () => {
  const [isOn, setOn] = useState(getReturn(3, 1) > 3);

  const toggleHandler = () => {
    setOn(!isOn);
  }

  return (
    <div>
    <h1>{isOn ? "ON": "OFF"} </h1>
    <button id='button1' onClick={toggleHandler}>Toggle Button</button>

    </div>
  );
};



Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;
