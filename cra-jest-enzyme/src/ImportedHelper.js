

import { getReturn } from './ReturnHelp';

export const ImportedHelper = () => {

    return (
      <div>
        <p>Helper return is {getReturn(1, 2)}</p>
      </div>
    );
}