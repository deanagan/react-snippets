import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import "./index.css";
import { nbaPlayers } from "./datalight";
import LoadingDots from "./Dots";
import TopPlayers from "./TopPlayers";
import { StatSelectorDropDown } from "./StatSelector";


const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.color};
`;

const ColoredHeader = styled.h1`
  color: ${(props) => props.color};
`;

const validStatOptions = [
  {
    Index: 0,
    Value: {
      Label: "Points",
      Column: "PTS",
    },
  },
  {
    Index: 1,
    Value: {
      Label: "Steals",
      Column: "STL",
    },
  },
  {
    Index: 2,
    Value: {
      Label: "Rebounds",
      Column: "TRB",
    },
  },
  {
    Index: 3,
    Value: {
      Label: "Assists",
      Column: "AST",
    },
  },
  {
    Index: 4,
    Value: {
      Label: "Blocks",
      Column: "BLK",
    },
  },
  {
    Index: 5,
    Value: {
      Label: "Three Point Made",
      Column: "3P",
    },
  },
];

function getAllPlayers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nbaPlayers);
    }, 2000);
  });
}

export default function App() {
  const [stat, setStat] = useState({ category: "PTS", top: 10 });
  const [isLoading, setIsLoading] = useState(true);
  const setStatToPoints = () => setStat({ ...stat, category: "PTS" });
  const setStatToAssists = () => setStat({ ...stat, category: "AST" });
  const setStatToRebounds = () => setStat({ ...stat, category: "TRB" });
  const setToOtherStat = (newStat) => setStat({ ...stat, category: newStat });
  const incTopCount = () =>
    setStat({ ...stat, top: Math.min(stat.top + 1, 50) });
  const decTopCount = () =>
    setStat({ ...stat, top: Math.max(0, stat.top - 1) });

  const [playerData, setPlayerData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllPlayers();
      setPlayerData(data);
      setIsLoading(false);
    }
    setIsLoading(true);
    fetchData();
  }, []);

  const topPlayers = useMemo(() => {
    let players = [];
    console.log("Recalculating top players");
    if (!isLoading && playerData.length > 0) {
      const availablePlayers = playerData.map((p) => ({
        player: p["Player"],
        stat: p[stat.category],
      }));
      players = availablePlayers
        .sort((a, b) => b.stat - a.stat)
        .slice(0, stat.top);
    }
    return players;
  }, [isLoading, stat.category, stat.top, playerData]);

  // const [topPlayers, setTopPlayers] = useState([]);

  // useEffect(() => {
  //   console.log("Recalculating top players");
  //   const availablePlayers = playerData.map((p) => ({
  //     player: p["Player"],
  //     stat: p[stat.category],
  //   }));
  //   const players = availablePlayers
  //     .sort((a, b) => b.stat - a.stat)
  //     .slice(0, stat.top);
  //   setTopPlayers(players);

  // }, [stat.category, stat.top, playerData]);

  return (
    <div className="App">
      <ColoredHeader color={"blue"}>
        1997-1998 NBA Season Statistics
      </ColoredHeader>
      <Button onClick={incTopCount}>Increase Top</Button>
      <Button onClick={decTopCount}>Decrease Top</Button>
      <Button onClick={setStatToPoints}>Show Points</Button>
      <Button onClick={setStatToRebounds}>Show Rebounds</Button>
      <Button onClick={setStatToAssists}>Show Assists</Button>
      <ColoredHeader color={"black"}>
        Current Stat: {stat.category}
      </ColoredHeader>

      {isLoading ? (
        <LoadingDots length={7} />
      ) : (
        <>
          <TopPlayers topPlayers={topPlayers} category={stat.category} />
          <StatSelectorDropDown
            setStatCallback={setToOtherStat}
            validStatOptions={validStatOptions}
          />
        </>
      )}
    </div>
  );
}
