import { useMemo, useState } from "react";
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
  { name: "white", uniqueId: 11 },
];

const favoriteColors = ['red', 'green', 'blue'];
const getColorType = (color) => (['red', 'blue', 'green']).includes(color) ? 'PRIMARY' : 'NON PRIMARY';

export default function ColorAppV3() {
  const [currentColor, setCurrentColor] = useState("blue");
  const [counter, setCounter] = useState(0);
  const setToGreen = () => setToOtherColor("green");
  const setToRed = () => setToOtherColor("red");
  const setToBlue = () => setToOtherColor("blue");
  const incrementCount = () => setCounter(counter + 1);
  const setToOtherColor = (color) => setCurrentColor(color);


  const colorChoices = useMemo(() => {
    return colors.filter((c) => c.name !== currentColor);
  }, [currentColor]);


  return (
    <div className="App">
      <ColoredHeader color={currentColor}>I change color. Counter: {counter}</ColoredHeader>
      <h2>Change the color using the buttons or the drop down!</h2>

      <Button onClick={setToRed}>Red</Button>
      <Button onClick={setToGreen}>Green</Button>
      <Button onClick={setToBlue}>Blue</Button>
      <Button onClick={incrementCount}>Increment Counter</Button>
      <div>Color Type: {getColorType(currentColor)}</div>

      <ColorDropDown
        colorChoices={colorChoices}
        currentColor={currentColor}
        setToColor={setToOtherColor}
      />

      <TopColors colors={favoriteColors}/>
    </div>
  );
}
