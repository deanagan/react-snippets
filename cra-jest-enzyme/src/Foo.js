import React, { PropTypes } from 'react';

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

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;
