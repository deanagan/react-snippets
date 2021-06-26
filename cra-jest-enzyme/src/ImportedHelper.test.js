
import React from 'react';
import { render } from 'enzyme';

import { ImportedHelper } from './ImportedHelper';

jest.mock('./ReturnHelp', () => {
    return { getReturn: (x, y) => x * y };
});

describe('A suite', function() {


  it('should render to correct outcome when using mock function', function() {

    expect(render(<ImportedHelper />).text()).toEqual('Helper return is 2');
  });

});
