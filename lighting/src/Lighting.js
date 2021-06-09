import { useState, useEffect } from 'react';

export const Lighting = () => {
  const [isOn, setOn] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${toggleCount} times`;
  });

  const toggleHandler = () => {
    setOn(!isOn);
    setToggleCount(toggleCount + 1);
  }

  return (
    <div>
    <h1>{isOn ? "ON": "OFF"} </h1>
    <p>You've toggled {toggleCount} times</p>
    <button onClick={toggleHandler}>Toggle Button</button>
    </div>
  );
};
