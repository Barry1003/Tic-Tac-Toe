import PropTypes from 'prop-types';
import { useState } from 'react';

const Square = ({ playerOne, playerTwo, isPlayingAlone, onExit }) => {
  const [values, setValues] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [userWins, setUserWins] = useState(0);
  const [userLosses, setUserLosses] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [playerTwoLosses, setPlayerTwoLosses] = useState(0);

  const handleClicked = (index) => {
    if (values[index] || winner) return;

    const nextSquares = values.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setValues(nextSquares);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(nextSquares);
    if (calculatedWinner) {
      const winnerName = calculatedWinner === "X" ? playerOne : playerTwo;
      setWinner(`${winnerName} wins`);
      updateScores(winnerName);
    } else if (!xIsNext && isPlayingAlone) {
      // Computer's move
      setTimeout(() => {
        const bestMove = getBestMove(nextSquares);
        nextSquares[bestMove] = "O";
        setValues(nextSquares);
        const calculatedWinnerAfterMove = calculateWinner(nextSquares);
        if (calculatedWinnerAfterMove) {
          setWinner(`${playerTwo} wins`);
          updateScores(playerTwo);
        } else if (!nextSquares.includes(null)) {
          setWinner(`${playerOne} loses`);
          updateScores(playerTwo);
        }
        setXIsNext(true);
      }, 500);
    } else if (!nextSquares.includes(null)) {
      setWinner(`${playerOne} loses`);
      updateScores(playerTwo);
    }
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const getBestMove = (squares) => {
    const emptySquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const updateScores = (winnerName) => {
    if (isPlayingAlone) {
      if (winnerName === playerOne) {
        setUserWins(userWins + 1);
      } else {
        setUserLosses(userLosses + 1);
      }
    } else {
      if (winnerName === playerOne) {
        setUserWins(userWins + 1);
        setPlayerTwoLosses(playerTwoLosses + 1);
      } else {
        setPlayerTwoWins(playerTwoWins + 1);
        setUserLosses(userLosses + 1);
      }
    }
  };

  const handleTryAgain = () => {
    setValues(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-[100vh]">
      <div className="p-4 bg-white w-[20%] h-1/2 place-content-center grid grid-cols-3" style={{ border: "1px black solid" }}>
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClicked(index)}
            style={{ transition: "ease-in-out all 5s" }}
            className="p-4 border border-black bg-white font-bold"
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <h2 className="mt-4 font-bold text-xl mb-4 text-white">{winner} 🤩🤗🤩🎉✨✨</h2>}
      <div className="mt-4 flex gap-4">
        <div className="text-white">
          <h3 className="font-bold text-lg">Player Stats</h3>
          <p>{playerOne}: {userWins} Wins, {userLosses} Losses</p>
          {!isPlayingAlone && <p>{playerTwo}: {playerTwoWins} Wins, {playerTwoLosses} Losses</p>}
        </div>
        {winner && (
          <div className="flex gap-4">
            <button onClick={handleTryAgain} className="bg-green-500 px-4 py-2 text-white rounded">Try Again</button>
            <button onClick={onExit} className="bg-red-500 px-4 py-2 text-white rounded">Exit</button>
          </div>
        )}
      </div>
    </div>
  );
};

Square.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  isPlayingAlone: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
};

export default Square;
