import { useState, useEffect } from 'react';
import './App.css';
import StartMenu from './components/StartMenu/StartMenu';
import Gameboard from './components/Gameboard/Gameboard';

function App() {
  const [theme, setTheme] = useState('numbers');
  const [numPlayers, setNumPlayers] = useState(1);
  const [gridSize, setGridSize] = useState(4);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    const storedGameState = JSON.parse( localStorage.getItem('gameState') );

    if(storedGameState !== null) {
      if(storedGameState.numPlayers > 1) {
        setNumPlayers(storedGameState.numPlayers);
      }
      
      setTheme(storedGameState.theme);
      setGridSize(storedGameState.gridSize);
      setStartGame(true);
    }
  }, []);


  return (
    <div className="App">
      {startGame ? 
        <Gameboard
          theme={theme}
          numPlayers={numPlayers}
          gridSize={gridSize}
          setStartGame={setStartGame}
          setTheme={setTheme}
          setNumPlayers={setNumPlayers}
          setGridSize={setGridSize}
        /> 
        : 
        <StartMenu
          setStartGame={setStartGame}
          setTheme={setTheme}
          setNumPlayers={setNumPlayers}
          setGridSize={setGridSize}
        />
      }

      <section className='attribution'>
        All icons used were created by <a href="https://fontawesome.com/">Font Awesome</a> (<a href="https://creativecommons.org/licenses/by/4.0/">License</a>). No icons were modified.
      </section>
    </div>
  );
}

export default App;
