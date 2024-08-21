import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const User = ({ onSubmit }) => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playAlone, setPlayAlone] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Standard for most browsers.
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
    <div className='h-[90vh] w-full flex flex-col gap-6 items-center justify-center'>
      <div className="bg-[#FA440B] px-4 py-2">
        <h1 className='md:text-[65px] font-serif text-[#0A033C} font-extrabold text-center'>Welcome to Tic Tac Toe</h1>
        <p className='text-gray-200 text-3xl font-bold text-center'>Players, insert your name to play against each other or play alone.</p>
      </div>
      <form onSubmit={handleSubmit} className='bg-slate-600 px-6 py-4 rounded flex flex-col gap-4 items-center'>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <label htmlFor="playAlone" className='text-white'>Play Alone</label>
            <input
              type="checkbox"
              id="playAlone"
              checked={playAlone}
              onChange={(e) => setPlayAlone(e.target.checked)}
              className='bg-transparent border-white text-white'
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="playerOne" className='text-white'>Player One [X player]</label>
            <input
              type="text"
              id="playerOne"
              value={playerOne}
              onChange={(e) => setPlayerOne(e.target.value)}
              placeholder="Enter name"
              className="font-semibold outline-none border-white border p-2 bg-transparent text-blue-200"
              required
            />
            {!playAlone && (
              <>
                <label htmlFor="playerTwo" className='text-white'>Player Two [O player]</label>
                <input
                  type="text"
                  id="playerTwo"
                  value={playerTwo}
                  onChange={(e) => setPlayerTwo(e.target.value)}
                  placeholder="Enter name"
                  className="font-semibold border-white border outline-none p-2 bg-transparent text-red-200"
                  required={!playAlone}
                />
              </>
            )}
          </div>
          <input type="submit" value="Submit" className='bg-blue-500 px-5 py-1' />
        </div>
      </form>
    </div>
  );
};

User.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default User;
