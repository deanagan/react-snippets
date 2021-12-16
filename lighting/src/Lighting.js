import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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

export function useMemoObjCompare(value) {
  const prevRef = useRef();
  const previous = prevRef.current;
  const isObjEqual = isEqual(previous, value);
  useEffect(() => {
    if (!isObjEqual) {
      prevRef.current = value;
    }
  });
  return isObjEqual ? previous : value;
}

// React.memo is an alternative
//export const Lighting = React.memo(({initial, colors}) => {
export const Lighting = ({initial, colors, num, directions}) => {
  const [isOn, setOn] = useState(initial);
  const [toggleCount, setToggleCount] = useState(0);
  const [fruits, setFruits] = useState([])
  const numRef = useRef(num);
  //const mybarty = [];
  useEffect(() => {
    document.title = `You clicked ${toggleCount} times`;
  }, [toggleCount]);

  useEffect(() => {
    setOn(initial);

  }, [initial]);

  const memoizedDirections = useMemoObjCompare(directions);

  useEffect(() => {
    console.log("Directions changed");
  }, [memoizedDirections]);


  // do this if you want to keep a color by default
  // const defColors = useRef(colors);

  // bad - memo is bad here. it will keep re-running due to referential inequality
  useMemo(() => {
    console.log(colors);

  }, [colors]);

  useEffect(() => {
    numRef.current = num;
  }, [num]);

  useEffect(() => {
    console.log(numRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numRef.current]);

  // const cb = useCallback(() => {
  //   console.log("Use callback triggered");
  //   console.log(defColors.current);
  // }, []);

  // useEffect(() => {
  //   console.log('callback updated')
  // }, [cb]);

  // good - we only run if the colors are not the same
  // useDeepCompareEffect(() => {

  //   console.log(colors);
  // }, [colors]);

  // color alternative


  useEffect(() => {
    console.log('Did mount');
  }, []);

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
    {/* <p>Default color: {defColors}</p> */}
    <p>{memofruits}</p>

    <button onClick={toggleHandler}>Toggle Button</button>
    <button onClick={ () => setFruits(['Apple', 'Banana', 'Grapes']) }>Salad 1</button>
    <button onClick={() => setFruits(['Blueberries', 'Kiwi', 'Plum'])}>Salad 2</button>

    </div>
  );

}
// React.memo is an alternative
// }, (p1, p2) => isEqual(p1, p2)
// );
