import './App.css';
import { Lighting } from './Lighting';
import TableWithFragment from './TableWithFragment';
import { useState } from 'react';

function App() {
  const [colors, setColors] = useState(['red', 'blue']);
  return (
    <div className="App">
      <h1>Lighting App</h1>
      <Lighting initial={false} colors ={colors} />
      <TableWithFragment />
      <button onClick= { () => setColors(['red', 'blue'])}>Add Same</button>

      <button onClick= { () => setColors(['red', 'blue', 'green'])}>Add New</button>

    </div>
  );
}

export default App;
