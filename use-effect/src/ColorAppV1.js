import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ColorDropDown from "./ColorDropdown";
import { Button, ColoredHeader } from "./StyledComponents";
import "./styles.css";
import TopColors from "./TopColors";

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
  { name: "white", uniqueId: 11 }
];

const favoriteColors = ["red", "green", "blue"];

const getColorType = (color) =>
  ["red", "blue", "green"].includes(color) ? "PRIMARY" : "NON PRIMARY";

export default function ColorAppV1({ name, passedProp, propSetter }) {
  const [currentColor, setCurrentColor] = useState("blue");
  const [counter, setCounter] = useState(0);
  const cc = useRef(passedProp);
  const setToGreen = () => setToOtherColor("green");
  const setToRed = () => setToOtherColor("red");
  const setToBlue = () => setToOtherColor("blue");

  const incrementCount = useCallback(() => {
    setCounter((c) => c + 1);
    propSetter((cc) => ({ ...cc, counter: cc.counter + 1 }));
  }, [propSetter]);

  const setToOtherColor = useCallback(
    (color) => {
      setCurrentColor(color);
      propSetter((cc) => ({ ...cc, color: color }));
    },
    [propSetter]
  );

  const colorChoices = useMemo(
    () => colors.filter((c) => c.name !== currentColor),
    [currentColor]
  );

  // useEffect on every mount and re-render
  useEffect(() => {
    console.log("Run on mount and every re-render");
    if (cc.current === currentColor) {
      console.log("Re-ran despite color counter the same");
      cc.current = currentColor;
    } else {
      console.log(currentColor, cc.current)
      cc.current = currentColor
    }
  });
  // useEffect on mount only
  useEffect(() => {
    console.log("I run on mount only");
  }, []);
  // useEffect on mount + when color changes
  useEffect(() => {
    console.log(
      "I run on mount and whenever currentColor changes",
      currentColor
    );
  }, [currentColor]);
  // useEffect on
  useEffect(() => {
    console.log(
      "I run on mount and whenever colorAndCounter changes",
      passedProp
    );
  }, [passedProp]);

  return (
    <div className="App">
      <ColoredHeader color={currentColor}>
        I change color. Counter: {counter}
      </ColoredHeader>
      <h2>Change the color using the buttons or the drop down!</h2>

      <Button onClick={setToRed}>Red</Button>
      <Button onClick={setToGreen}>Green</Button>
      <Button onClick={setToBlue}>Blue</Button>
      <Button onClick={incrementCount}>Increment Counter</Button>
      <div>Color Type: {getColorType(currentColor)}</div>
      <div>Name: {name}</div>
      <div>
        Color and Counter: {passedProp.color} {passedProp.counter}
      </div>
      <ColorDropDown
        colorChoices={colorChoices}
        currentColor={currentColor}
        setToColor={setToOtherColor}
      />

      <TopColors colors={favoriteColors} />
    </div>
  );
}
