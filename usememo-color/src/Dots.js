import React from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  z-index: 10;
  margin-left: 43%;
`;

const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

const LoadingDots = ({ length }) => {
  return (
    <DotWrapper>
      {Array.from({ length }, (_, i) => i).map((dot) => (
        <Dot key={dot} delay={`${dot / 10}s`} />
      ))}
    </DotWrapper>
  );
};

export default LoadingDots;
