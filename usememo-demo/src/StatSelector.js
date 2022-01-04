import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Dropbtn = styled.div`
  display: inline-block;
  color: black;
  background-color: cyan;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;
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

export function StatSelectorDropDown({ setStatCallback, validStatOptions }) {
  const [currentEntry, setCurrentEntry] = useState("Pick Stat");
  const [clickedOutside, setClickedOutside] = useState(true);
  const currentComponentRef = useRef(null);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  const onSelectHandler = (entry) => {
    setCurrentEntry(entry.Value.Label);
    setStatCallback(entry.Value.Column);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickInside = () => setClickedOutside(false);
  return (
    <div>
      <DropDownLi>
        <Dropbtn onClick={handleClickInside}>{currentEntry}</Dropbtn>
        {!clickedOutside ? (
          <DropDownContent ref={currentComponentRef}>
            {validStatOptions.map((pe) => (
              <DropDownItem
                key={pe.Index}
                onClick={() => {
                  onSelectHandler(pe);
                  setClickedOutside(true);
                }}
              >
                {pe.Value.Label}
              </DropDownItem>
            ))}
          </DropDownContent>
        ) : null}
      </DropDownLi>
    </div>
  );
}
