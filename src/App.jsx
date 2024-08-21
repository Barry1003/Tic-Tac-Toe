import { useState } from "react";
import Square from "./components/Box"
import User from "./components/user"
import './index.css'
 
 const App = () => {
  const [players, setPlayers] = useState(null);

  const handleUserSubmit = (playerNames) => {
    setPlayers(playerNames);
  };

  return (
    <div>
      {!players ? (
        <User onSubmit={handleUserSubmit} />
      ) : (
        <Square playerOne={players.playerOne} playerTwo={players.playerTwo} />
      )}
    </div>
  );
};
 
 export default App
 