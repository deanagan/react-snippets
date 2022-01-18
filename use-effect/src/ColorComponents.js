import { useState } from "react";
import ColorAppV1 from "./ColorAppV1";
import { InputName } from "./StyledComponents";

export default function ColorComponents() {
  const [name, setName] = useState("");
  const [colorAndCounter, setColorAndCounter] = useState({
    color: "blue",
    counter: 0
  });

  const changeName = (e) => {
    setName(e.currentTarget.value);
  };

  return (
    <>
      <ColorAppV1
        passedProp={colorAndCounter}
        propSetter={setColorAndCounter}
        name={'name'}
      />
      <InputName onChange={changeName} value={name} />
    </>
  );
}
