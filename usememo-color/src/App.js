import { useMemo, memo, useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import "./styles.css";
import LoadingDots from "./Dots";
import TopColors from "./Table";

const Dropbtn = styled.div`
  display: inline-block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

const DropDownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #13795a;
  }
`;

const DropDownLi = styled.li`
  display: inline-block;
  &:hover {
    background-color: gray;
  }
`;

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.color};
`;

const ColoredHeader = styled.h1`
  color: ${(props) => props.color};
`;

const colors = [
  { name: "red", uniqueId: 1 },
  { name: "green", uniqueId: 2 },
  { name: "blue", uniqueId: 3 },
  { name: "orange", uniqueId: 4 },
  { name: "yellow", uniqueId: 5 },
  { name: "violet", uniqueId: 6 },
  { name: "pink", uniqueId: 7 },
  { name: "gray", uniqueId: 8 },
  { name: "brown", uniqueId: 9 },
  { name: "black", uniqueId: 10 },
  { name: "white", uniqueId: 11 },
];

export default function App() {
  const [currentColor, setCurrentColor] = useState("blue");
  const [counter, setCounter] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const setToGreen = () => setToOtherColor("green");
  const setToRed = () => setToOtherColor("red");
  const setToBlue = () => setToOtherColor("blue");
  const incrementCount = () => setCounter(counter + 1);

  // Better Choice
  const setToOtherColor = useCallback((color) => setCurrentColor(color), []);

  // Choice
  //const setToOtherColor = (color) => setCurrentColor(color);

  // Better Choice
  const colorChoices = useMemo(() => {
    return colors.filter((c) => c.name !== currentColor);
  }, [currentColor]);

  // Another Choice
  // const colorChoices = colors.filter((c) => c.name !== currentColor);

  // Choice
  // const [colorChoices, setColorChoices] = useState(colors);
  // useEffect(() => {
  //   setColorChoices(colors.filter((c) => c.name !== currentColor));
  // }, [currentColor]);


  // Better Choice
  const favoriteColors = useMemo(() => ['red', 'green', 'blue'], []);

  // Choice
  //const favoriteColors = ['red', 'green', 'blue'];

  return (
    <div className="App">
      <ColoredHeader color={currentColor}>I change color. Counter: {counter}</ColoredHeader>
      <h2>Change the color using the buttons or the drop down!</h2>

      <Button onClick={setToRed}>Red</Button>
      <Button onClick={setToGreen}>Green</Button>
      <Button onClick={setToBlue}>Blue</Button>
      <Button onClick={incrementCount}>Increment Counter</Button>

      <ColorDropDown
        colorChoices={colorChoices}
        currentColor={currentColor}
        setToColor={setToOtherColor}
      />

      <TopColors colors={favoriteColors}/>
    </div>
  );
}

function ColorDropDown({ colorChoices, currentColor, setToColor }) {
  const [currentEntry, setCurrentEntry] = useState(currentColor);
  const [clickedOutside, setClickedOutside] = useState(true);
  const currentComponentRef = useRef(null);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    console.log("render drop down");
  }, [colorChoices, currentColor, setToColor]);

  useEffect(() => {
    setCurrentEntry(currentColor);
  }, [currentColor]);

  const onSelectHandler = (entry) => {
    setCurrentEntry(entry.name);
    setToColor(entry.name);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickInside = () => setClickedOutside(false);
  return (
    <DropDownLi>
      <Dropbtn onClick={handleClickInside}>{currentEntry}</Dropbtn>
      {!clickedOutside ? (
        <DropDownContent ref={currentComponentRef}>
          {colorChoices.map((pe) => (
            <DropDownItem
              key={pe.uniqueId.toString()}
              onClick={() => {
                onSelectHandler(pe);
                setClickedOutside(true);
              }}
            >
              {pe.name}
            </DropDownItem>
          ))}
        </DropDownContent>
      ) : null}
    </DropDownLi>
  );
}
