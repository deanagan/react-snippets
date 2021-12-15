import { useState, useEffect, useMemo, useRef } from 'react';
import { isEqual } from 'lodash';

function useDeepCompareMemoize(value) {
  const ref = useRef(value)
  const signalRef = useRef(0)

  if (!isEqual(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current])
}

export function useDeepCompareEffect(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies))
}

export const Lighting = ({initial, colors}) => {
  const [isOn, setOn] = useState(initial);
  const [toggleCount, setToggleCount] = useState(0);
  const [fruits, setFruits] = useState([])
  const mybarty = [];
  useEffect(() => {
    document.title = `You clicked ${toggleCount} times`;
  }, [toggleCount]);

  useEffect(() => {
    setOn(initial);

  }, [initial]);

  useDeepCompareEffect(() => {

    console.log(colors);
  }, [colors]);

  const toggleHandler = () => {
    setOn(!isOn);
    setToggleCount(toggleCount + 1);
  }

  const memofruits = useMemo(() => {
    console.log('memoise fruit');
    return JSON.stringify(fruits);
  }, [fruits]);

  return (
    <div>
    <h1>{isOn ? "ON": "OFF"} </h1>
    <p>You've toggled {toggleCount} times</p>
    <p>{memofruits}</p>
    <button onClick={toggleHandler}>Toggle Button</button>
    <button onClick={ () => setFruits(['Apple', 'Banana', 'Grapes']) }>Salad 1</button>
    <button onClick={() => setFruits(['Blueberries', 'Kiwi', 'Plum']) || mybarty.push(1)}>Salad 2</button>
      <h2>{mybarty}</h2>
    </div>
  );
};
