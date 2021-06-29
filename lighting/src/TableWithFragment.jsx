
import React from 'react';
import Columns from './Columns';

class TableWithFragment extends React.Component {
    render() {
      return (
        <table>
          <tr>
            <Columns />
          </tr>
        </table>
      );
    }
  }

export default TableWithFragment;