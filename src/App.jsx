import { useState } from "react";
import Square from "./components/Box";
import User from "./components/user";
import './index.css';

const App = () => {
  const [players, setPlayers] = useState(null);
  const [isPlayingAlone, setIsPlayingAlone] = useState(false);

  const handleUserSubmit = (playerNames) => {
    setPlayers(playerNames);
    setIsPlayingAlone(playerNames.playerTwo === 'Computer' ? true : false);
  };

  const handleExit = () => {
    // Redirect to the user page (resetting players and isPlayingAlone state)
    setPlayers(null);
    setIsPlayingAlone(false);
  };

  return (
    <div>
      {!players ? (
        <User onSubmit={handleUserSubmit} />
      ) : (
        <Square
          playerOne={players.playerOne}
          playerTwo={players.playerTwo}
          isPlayingAlone={isPlayingAlone}
          onExit={handleExit}
        />
      )}
    </div>
  );
};

export default App;
