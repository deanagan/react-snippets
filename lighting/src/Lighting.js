import { useState, useEffect } from 'react';

export const Lighting = ({initial}) => {
  const [isOn, setOn] = useState(initial);
  const [toggleCount, setToggleCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${toggleCount} times`;
  }, [toggleCount]);

  useEffect(() => {
    setOn(initial);
  }, [initial]);

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
