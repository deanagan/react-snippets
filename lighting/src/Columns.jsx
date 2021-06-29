import React from 'react';

// Note: '<></> is the same as <React.Fragment></React.Fragment>
class Columns extends React.Component {
    render() {
      return (
        <>
          <td>Hello</td>
          <td>World</td>
        </>
      );
    }
  }

export default Columns;