import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { isEqual } from "lodash";

const BallWithReduxComponent = (props) => {
  const renderCountRef = useRef(0);
  const renderCount = renderCountRef.current;

  useEffect(() => {
    renderCountRef.current += 1;
  });
  return (
    <div>
      <h4>Memoized Component 3: Render count: {renderCount} time(s)</h4>
      <h4>
        Memoized Component 3: Ball change: Color:{props.ball.color}, Weight:{" "}
        {props.ball.weight} gram(s)
      </h4>
      <p>Redux: {props.state}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: "connected to redux state..."
});

// create a version that only renders on prop changes
export const MemoizedBallInfoReduxComponent = connect(mapStateToProps)(
  React.memo(BallWithReduxComponent, (p1, p2) => isEqual(p1, p2))
);
