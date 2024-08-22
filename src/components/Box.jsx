import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

const Square = ({ playerOne, playerTwo, isPlayingAlone, onExit }) => {
  const [values, setValues] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // True means 'X' turn, false means 'O' turn
  const [winner, setWinner] = useState(null);
  const [userWins, setUserWins] = useState(0);
  const [userLosses, setUserLosses] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [playerTwoLosses, setPlayerTwoLosses] = useState(0);

  const updateScores = useCallback(
    (winnerName) => {
      if (isPlayingAlone) {
        if (winnerName === playerOne) {
          setUserWins((prevWins) => prevWins + 1);
        } else {
          setUserLosses((prevLosses) => prevLosses + 1);
        }
      } else {
        if (winnerName === playerOne) {
          setUserWins((prevWins) => prevWins + 1);
          setPlayerTwoLosses((prevLosses) => prevLosses + 1);
        } else {
          setPlayerTwoWins((prevWins) => prevWins + 1);
          setUserLosses((prevLosses) => prevLosses + 1);
        }
      }
    },
    [isPlayingAlone, playerOne]
  );

  useEffect(() => {
    if (!xIsNext && isPlayingAlone && !winner) {
      const bestMove = getBestMove(values);
      const nextSquares = values.slice();
      nextSquares[bestMove] = "O";
      setValues(nextSquares);
      setXIsNext(true);

      const calculatedWinner = calculateWinner(nextSquares);
      if (calculatedWinner) {
        setWinner(`${playerTwo} wins`);
        updateScores(playerTwo);
      } else if (!nextSquares.includes(null)) {
        setWinner(`It's a draw`);
      }
    }
  }, [xIsNext, isPlayingAlone, winner, values, playerTwo, updateScores]);

  const handleClicked = (index) => {
    if (values[index] || winner) return; // Ignore clicks on filled squares or after game over

    const nextSquares = values.slice();
    nextSquares[index] = xIsNext ? "X" : "O"; // Set 'X' or 'O' based on the current turn
    setValues(nextSquares);
    setXIsNext(!xIsNext); // Switch turns

    const calculatedWinner = calculateWinner(nextSquares);
    if (calculatedWinner) {
      setWinner(`${xIsNext ? playerOne : playerTwo} wins`);
      updateScores(xIsNext ? playerOne : playerTwo);
    } else if (!nextSquares.includes(null)) {
      setWinner(`It's a draw`);
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
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const handleTryAgain = () => {
    setValues(Array(9).fill(null));
    setXIsNext(true); // Reset to 'X' start turn
    setWinner(null);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-[100vh] bg-gray-800">
      <div className="p-4 bg-gray-900 w-full max-w-md h-[400px] grid grid-cols-3 gap-1">
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClicked(index)}
            className="p-6 border border-gray-700 bg-gray-800 text-white text-2xl font-bold hover:bg-gray-700 transition-all"
          >
            {value}
          </button>
        ))}
      </div>
      {winner && (
        <h2 className="mt-4 font-bold text-2xl text-white mb-4">{winner} 🎉</h2>
      )}
      <div className="mt-4 flex gap-4">
        <div className="text-white">
          <h3 className="font-bold text-lg">Player Stats</h3>
          <p>
            {playerOne}: {userWins} Wins, {userLosses} Losses
          </p>
          {!isPlayingAlone && (
            <p>
              {playerTwo}: {playerTwoWins} Wins, {playerTwoLosses} Losses
            </p>
          )}
        </div>
        {winner && (
          <div className="flex gap-4">
            <button
              onClick={handleTryAgain}
              className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-400"
            >
              Try Again
            </button>
            <button
              onClick={onExit}
              className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-400"
            >
              Exit
            </button>
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
