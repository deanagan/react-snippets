import './App.css';
import { Lighting } from './Lighting';
import TableWithFragment from './TableWithFragment';

function App() {
  return (
    <div className="App">
      <h1>Lighting App</h1>
      <Lighting initial={false} />
      <TableWithFragment />
    </div>
  );
}

export default App;
