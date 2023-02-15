import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const calculateWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a] + "Won the Game";
      }
    }
    if (!grid.includes(null)) {
      return "Draw";
    }
    return null;
  };

  const winner = calculateWinner();

  const handleClick = (index) => {
    if (grid[index] || winner) {
      return;
    }
    const newGrid = [...grid];
    newGrid[index] = currentPlayer;
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  return (
    <div className="board-container">
      {winner ? (
        <>
          {winner} <button onClick={resetGame}>Play Again</button>
        </>
      ) : (
        <>
          <h1 className="player-Name">Player: {currentPlayer} Please Move</h1>
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Square onClick={() => handleClick(i)} value={grid[i]} />
              ))}
          </div>
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Square
                  onClick={() => handleClick(i + 3)}
                  value={grid[i + 3]}
                />
              ))}
          </div>
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Square
                  onClick={() => handleClick(i + 6)}
                  value={grid[i + 6]}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
