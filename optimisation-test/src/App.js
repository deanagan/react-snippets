import { useState } from 'react';
import './App.css';
import Info from './Info';
import InfoMemoized from './InfoMemoized';

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [approved, setApproved] = useState('');

  return (
    <div className="App">
      <label htmlFor='cb1'>Accept: </label>
      <input id='cb1' type="checkbox" checked={isAccepted} onChange={() => setIsAccepted(!isAccepted)}/>
      <br />

      <label htmlFor='cb2'>Signed: </label>
      <input id='cb2' type="checkbox" checked={isSigned} onChange={() => setIsSigned(!isSigned)}/>
      <br />

      <label htmlFor='cb3'>Sealed: </label>
      <input id='cb3' type="checkbox" checked={isSealed} onChange={() => setIsSealed(!isSealed)}/>
      <br />

      <label htmlFor='tb1'>Passcode: </label>
      <input id='tb1' type="text" value={approved} onChange={(e) => setApproved(e.target.value)}/>
      <br />


      <Info isAccepted={isAccepted} isSigned={isSigned} isSealed={isSealed}  approved={approved}/>
      <br />
      {/* <InfoMemoized isAccepted={isAccepted} isSigned={isSigned} isSealed={isSealed} approved={approved}/> */}
    </div>
  );
}

export default App;
