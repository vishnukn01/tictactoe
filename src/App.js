import React, { useState, useEffect } from "react";
import SquareComponent from "./components/SquareComponent";

function App() {
  const initialGameState = ["", "", "", "", "", "", "", "", ""];
  const [isUsersTurn, setisUsersTurn] = useState(true);
  const [gameState, setgameState] = useState(initialGameState);
  const [isStalemate, setisStalemate] = useState(false);

  function handleSqaureClick(index) {
    if (isUsersTurn && gameState[index] === "") {
      let gameStateArray = [...gameState];
      gameStateArray[index] = "X";
      setgameState(gameStateArray);
      setisUsersTurn(false);
    }
  }

  function checkWinner() {
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
  }

  function clearGame() {
    setgameState(initialGameState);
    setisStalemate(false);
    setisUsersTurn(true);
  }

  function noneEmpty(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "") return false;
    }
    return true;
  }

  useEffect(() => {
    if (!isUsersTurn) {
      let winner = checkWinner();
      if (winner === null && !isStalemate) {
        let emptySpaces = [];
        let gameStateArray = [...gameState];
        gameStateArray.forEach((item, index) => {
          if (item === "") {
            emptySpaces.push(index);
          }
        });
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
        let performedMove = false;
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (
            gameState[a] === "X" &&
            gameState[b] === "X" &&
            gameState[c] === ""
          ) {
            let updatedGameState = [...gameState];
            updatedGameState[c] = "O";
            setgameState(updatedGameState);
            setisUsersTurn(true);
            performedMove = true;
            break;
          } else if (
            gameState[b] === "X" &&
            gameState[c] === "X" &&
            gameState[a] === ""
          ) {
            let updatedGameState = [...gameState];
            updatedGameState[a] = "O";
            setgameState(updatedGameState);
            setisUsersTurn(true);
            performedMove = true;
            break;
          } else if (
            gameState[a] === "X" &&
            gameState[c] === "X" &&
            gameState[b] === ""
          ) {
            let updatedGameState = [...gameState];
            updatedGameState[b] = "O";
            setgameState(updatedGameState);
            setisUsersTurn(true);
            performedMove = true;
            break;
          }
        }
        if (!performedMove && !noneEmpty(gameState)) {
          let updatedGameState = [...gameState];
          let boxToFill =
            emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
          updatedGameState[boxToFill] = "O";
          setgameState(updatedGameState);
          setisUsersTurn(true);
        }
      }
    }
  }, [isUsersTurn]);

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setTimeout(() => {
        alert(`${winner} has won!`);
        clearGame();
      }, 50);
    } else if (noneEmpty(gameState)) {
      setisStalemate(true);
      setTimeout(() => {
        alert("Stalemate! Better luck next time");
        clearGame();
      }, 50);
    }
  }, [gameState]);

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
