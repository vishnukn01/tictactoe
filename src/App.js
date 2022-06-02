import React, { useState, useEffect } from "react";
import SquareComponent from "./components/SquareComponent";

function App() {
  const initialGameState = ["", "", "", "", "", "", "", "", ""];
  const [isXTurn, setisXTurn] = useState(true);
  const [gameState, setgameState] = useState(initialGameState);

  function handleSqaureClick(index) {
    let gameStateArray = [...gameState];
    gameStateArray[index] = isXTurn ? "X" : "O";
    setgameState(gameStateArray);
    setisXTurn(!isXTurn);
  }

  function clearGame() {
    setgameState(initialGameState);
    setisXTurn(true);
  }

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setTimeout(() => {
        alert(`${winner} has won!`);
        clearGame();
      }, 50);
    }
  }, [gameState]);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };

  return (
    <div className="app-header">
      <p className="heading-text">Tic Tac Toe</p>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          gameState={gameState[0]}
          onClick={() => {
            handleSqaureClick(0);
          }}
        />
        <SquareComponent
          className="b-bottom-right"
          gameState={gameState[1]}
          onClick={() => {
            handleSqaureClick(1);
          }}
        />
        <SquareComponent
          className="b-bottom"
          gameState={gameState[2]}
          onClick={() => {
            handleSqaureClick(2);
          }}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          gameState={gameState[3]}
          onClick={() => {
            handleSqaureClick(3);
          }}
        />
        <SquareComponent
          className="b-bottom-right"
          gameState={gameState[4]}
          onClick={() => {
            handleSqaureClick(4);
          }}
        />
        <SquareComponent
          className="b-bottom"
          gameState={gameState[5]}
          onClick={() => {
            handleSqaureClick(5);
          }}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-right"
          gameState={gameState[6]}
          onClick={() => {
            handleSqaureClick(6);
          }}
        />
        <SquareComponent
          className="b-right"
          gameState={gameState[7]}
          onClick={() => {
            handleSqaureClick(7);
          }}
        />
        <SquareComponent
          gameState={gameState[8]}
          onClick={() => {
            handleSqaureClick(8);
          }}
        />
      </div>
      <button className="clear-button" onClick={clearGame}>
        Clear game
      </button>
    </div>
  );
}

export default App;
