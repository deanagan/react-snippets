import './App.css';
import { Lighting } from './Lighting';
import { useState } from 'react';

function App() {
  const [colors, setColors] = useState(['red', 'blue']);
  const [directions, setDirections] = useState(['North', 'East']);
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <h1>Lighting App</h1>
      <Lighting initial={false} colors ={colors} num={num} directions={directions} />

      <button onClick= { () => setColors(['red', 'blue'])}>Add Same</button>

      <button onClick= { () => setColors(['red', 'blue', 'green'])}>Add New</button>

      <button onClick= { () => setNum(num+1)}>Add Num</button>

      <button onClick= { () => setDirections(['South', 'West'])}>Change Directions</button>

      <button onClick= { () => setDirections(['North', 'East'])}>Revert Directions</button>

    </div>
  );
}

export default App;
