
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import UsesLayoutEffect from './usesLayoutEffect';

const Button = styled.button`

`;

function App() {
  const [base, setBase] = useState(0);
  return (
    <>
      <UsesLayoutEffect base={base} />
      <Button onClick={() => setBase(base + 1)}>Increment</Button>
    </>
  );
}

export default App;
