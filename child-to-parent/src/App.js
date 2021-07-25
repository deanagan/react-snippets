import React, { useState } from "react";
import './App.css';
import { Modal } from './Modal';


function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setShow(true)}>Show Modal</button>
      <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
        <p>This is modal body</p>
      </Modal>

    </div>
  );
}

export default App;
