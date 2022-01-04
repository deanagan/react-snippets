
import { useEffect } from "react";
import styled from "styled-components";

export const TableRow = styled.tr``;
export const TableHeader = styled.thead``;
export const TableHeaderCell = styled.th``;
export const TableCell = styled.td``;
export const TableBody = styled.tbody``;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 20%;
  margin-left: 40%;
  margin-bottom: 10px;
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

const TopPlayers = ({ topPlayers, category }) => {

  useEffect(() => {
    console.log("Top players re-rendering");
  });

  return (
    <StyledTable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Player</TableHeaderCell>
          <TableHeaderCell>{category}</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topPlayers.map((p) => (
          <TableRow key={p.player}>
            <TableCell>{p.player}</TableCell>
            <TableCell>{p.stat}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default TopPlayers;
