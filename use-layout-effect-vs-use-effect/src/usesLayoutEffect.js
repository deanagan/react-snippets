import { useEffect, useLayoutEffect, useRef } from "react";



function UsesLayoutEffect({base}) {

  const numberRef = useRef(0);
  //useLayoutEffect(() => {
  useEffect(() => {
    numberRef.current = base * 2;
  }, [base]);

  return (
    <>
      <span>Counter {numberRef.current}</span>
    </>
  );
}

export default UsesLayoutEffect;