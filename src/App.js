import { useState } from 'react';
import './App.css';
import logo_1 from './assets/logo_1.svg';
import logo_2 from './assets/logo_2.svg';
import StartMenu from './components/StartMenu/StartMenu';
import Gameboard from './components/Gameboard/Gameboard';

function App() {
  const [theme, setTheme] = useState('numbers');
  const [numPlayers, setNumPlayers] = useState(1);
  const [gridSize, setGridSize] = useState(4);
  const [startGame, setStartGame] = useState(true);


  function changeTheme(theme) {
    setTheme(theme);

    const numbersTheme = document.querySelector('.btn--numbers');
    const iconsTheme = document.querySelector('.btn--icons');

    switch(theme) {
      case 'numbers':
        numbersTheme.classList.add('selected');
        iconsTheme.classList.remove('selected');
        break;
      case 'icons':
        numbersTheme.classList.remove('selected');
        iconsTheme.classList.add('selected');
        break;
      default:
        break;
    }
  }

  function changePlayers(number) {
    setNumPlayers(number);

    const players_1 = document.getElementById('players_1');
    const players_2 = document.getElementById('players_2');
    const players_3 = document.getElementById('players_3');
    const players_4 = document.getElementById('players_4');

    switch(number) {
      case 1:
        players_1.classList.add('selected');
        players_2.classList.remove('selected');
        players_3.classList.remove('selected');
        players_4.classList.remove('selected');
        break;
      case 2:
        players_1.classList.remove('selected');
        players_2.classList.add('selected');
        players_3.classList.remove('selected');
        players_4.classList.remove('selected');
        break;
      case 3:
        players_1.classList.remove('selected');
        players_2.classList.remove('selected');
        players_3.classList.add('selected');
        players_4.classList.remove('selected');
        break;
      case 4:
        players_1.classList.remove('selected');
        players_2.classList.remove('selected');
        players_3.classList.remove('selected');
        players_4.classList.add('selected');
        break;
      default: 
        break;
    }
  }

  function changeGridSize(size) {
    setGridSize(size);

    const grid_4 = document.getElementById('grid_4');
    const grid_6 = document.getElementById('grid_6');

    switch(size){
      case '4x4':
        grid_4.classList.add('selected');
        grid_6.classList.remove('selected');
        break;
      case '6x6':
        grid_4.classList.remove('selected');
        grid_6.classList.add('selected');
        break;
      default: 
        break;
    }
  }
  

  return (
    <div className="App">
      {startGame ? 
        <Gameboard
          theme={theme}
          numPlayers={numPlayers}
          gridSize={gridSize} 
        /> 
        : 
        <StartMenu
          changeTheme={changeTheme}
          changeGridSize={changeGridSize}
          changePlayers={changePlayers} 
          setStartGame={setStartGame}
        />
      }
    </div>
  );
}

export default App;
