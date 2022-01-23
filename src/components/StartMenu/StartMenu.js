import React from 'react';
import './StartMenu.css';
import logo_2 from '../../assets/logo_2.svg';

export default function StartMenu({ setTheme, setGridSize, setNumPlayers, setStartGame }) {
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
    
        switch(size) {
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
        <div className='start-menu'>
            <div className='start-menu__logo'>
                <img src={logo_2} alt='memory game logo' />
            </div>

            <div className='start-menu__menu'>
                <div className='start-menu__menu__theme'>
                    <div className="start-menu__menu__theme__label">Select Theme</div>

                    <div className='start-menu__menu__theme__buttons'>
                        <button 
                            className='btn btn--numbers selected' 
                            onClick={() => changeTheme('numbers')}
                        >Numbers</button>

                        <button 
                            className='btn btn--icons' 
                            onClick={() => changeTheme('icons')}
                        >Icons</button>
                    </div>
                </div>
          
                <div className='start-menu__menu__num-players'>
                    <div className="start-menu__menu__num-players__label">Number of Players</div>

                    <div className='start-menu__menu__num-players__buttons'>
                        <button 
                            className='btn btn--players selected' 
                            id='players_1' 
                            onClick={() => changePlayers(1)}
                        >1</button>

                        <button 
                            className='btn btn--players' 
                            id='players_2' 
                            onClick={() => changePlayers(2)}
                        >2</button>

                        <button 
                            className='btn btn--players' 
                            id='players_3' 
                            onClick={() => changePlayers(3)}
                        >3</button>
                        
                        <button 
                            className='btn btn--players' 
                            id='players_4' 
                            onClick={() => changePlayers(4)}
                        >4</button>
                    </div>
                </div>
          
                <div className='start-menu__menu__grid-size'>
                    <div className="start-menu__menu__grid-size__label">Grid Size</div>

                    <div className='start-menu__menu__grid-size__buttons'>
                        <button 
                            className='btn btn--grid selected' 
                            id='grid_4' 
                            onClick={() => changeGridSize(4)}
                        >4x4</button>

                        <button 
                            className='btn btn--grid' 
                            id='grid_6' 
                            onClick={() =>changeGridSize(6)}
                        >6x6</button>
                    </div>
                </div>
          
                <button 
                    className='start-menu__menu__start btn btn--start' 
                    onClick={() => setStartGame(true)}
                >Start Game</button>
            </div>
        </div>
    );
}
