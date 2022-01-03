import { useMemo, memo, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import "./index.css";
import { initColors } from "./Colors";
import { nbaPlayers } from "./datalight";

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

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 20%;
  margin-left: 40%;
  border: 1px solid black;
  th,
  td {
    text-align: left;
    padding: 16px;
    border: 1px solid black;
  }
  tr:nth-child(even) {
    background-color: yellow;
  }
`;

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.color};
`;

const ColoredHeader = styled.h1`
  color: ${(props) => props.color};
`;

export default function App() {
  const [stat, setStat] = useState({ category: "PTS", top: 5 });
  const setStatToPoints = () => setStat({ ...stat, category: "PTS" });
  const setStatToAssists = () => setStat({ ...stat, category: "AST" });
  const setStatToRebounds = () => setStat({ ...stat, category: "TRB" });
  const setToOtherStat = (stat) => setStat({ ...stat, category: stat });
 // const players = nbaPlayers.map(p => ({ Name: p['Player'], Stat: p[stat] } )).sort((a, b) => b.Stat - a.Stat).slice(0, 5);
  const statColumns = Object.keys(nbaPlayers[0]);
  return (
    <div className="App">
      <ColoredHeader color={'blue'}>1997-1998 NBA Season Statistics</ColoredHeader>
      <Button onClick={setStatToPoints}>Show Points</Button>
      <Button onClick={setStatToRebounds}>Show Rebounds</Button>
      <Button onClick={setStatToAssists}>Show Assists</Button>
      <ColoredHeader color={'black'}> Current Stat: {stat.category}</ColoredHeader>
      <StatSelectorDropDown currentStat={stat.category} setStatCallback={setToOtherStat} statColumns={statColumns}/>
    </div>
  );
}

function StatSelectorDropDown({ currentStat, setStatCallback, statColumns }) {
  const [currentEntry, setCurrentEntry] = useState("Pick Stat");
  const [clickedOutside, setClickedOutside] = useState(true);
  const currentComponentRef = useRef(null);
  const [choices, setChoices] = useState(statColumns);

  // const availableColors = useMemo(() => initColors.filter(c => !c.color.toLowerCase().includes(currentColor));

  // useEffect(() => {
  //   setChoices(availableColors);
  // }, [availableColors, currentColor]);

  // useEffect(() => {
  //   const players = nbaPlayers.keys;
  //   setChoices(players);
  // }, [currentStat]);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  const onSelectHandler = (entry) => {
    setCurrentEntry(entry);
    setStatCallback(entry);
  };

  useEffect(() => {
    console.log("mounted");
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
            {statColumns.map((pe) => (
              <DropDownItem
                key={pe}
                onClick={() => {
                  onSelectHandler(pe);
                  setClickedOutside(true);
                }}
              >
                {pe}
              </DropDownItem>
            ))}
          </DropDownContent>
        ) : null}
      </DropDownLi>
    </div>
  );
}
