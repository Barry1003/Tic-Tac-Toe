import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const User = ({ onSubmit }) => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playAlone, setPlayAlone] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playAlone && playerOne) {
      onSubmit({ playerOne, playerTwo: 'Computer' });
    } else if (playerOne && playerTwo) {
      onSubmit({ playerOne, playerTwo });
    } else {
      alert('Please enter names for both players.');
    }
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center   p-4'>
      <div className="bg-[#FA440B] px-6 py-4 rounded-lg shadow-lg">
        <h1 className='text-4xl md:text-5xl font-serif text-[#0A033C] font-extrabold text-center'>Welcome to Tic Tac Toe</h1>
        <p className='text-gray-200 text-lg md:text-xl font-bold text-center mt-2'>Players, insert your name to play against each other or play alone.</p>
      </div>
      <form onSubmit={handleSubmit} className='bg-slate-600 px-6 py-8 mt-6 rounded-lg shadow-lg w-full max-w-lg'>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <label htmlFor="playAlone" className='text-white text-lg'>Play Alone</label>
            <input
              type="checkbox"
              id="playAlone"
              checked={playAlone}
              onChange={(e) => setPlayAlone(e.target.checked)}
              className='w-5 h-5 bg-transparent border-2 border-white rounded-sm'
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="playerOne" className='text-white text-lg'>Player One [X player]</label>
            <input
              type="text"
              id="playerOne"
              value={playerOne}
              onChange={(e) => setPlayerOne(e.target.value)}
              placeholder="Enter name"
              className="font-semibold outline-none border-2 border-white p-3 bg-transparent text-blue-200 rounded-md"
              required
            />
            {!playAlone && (
              <>
                <label htmlFor="playerTwo" className='text-white text-lg'>Player Two [O player]</label>
                <input
                  type="text"
                  id="playerTwo"
                  value={playerTwo}
                  onChange={(e) => setPlayerTwo(e.target.value)}
                  placeholder="Enter name"
                  className="font-semibold border-2 border-white outline-none p-3 bg-transparent text-red-200 rounded-md"
                  required={!playAlone}
                />
              </>
            )}
          </div>
          <input
            type="submit"
            value="Submit"
            className='bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer transition-transform transform hover:scale-105'
          />
        </div>
      </form>
    </div>
  );
};

User.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default User;
