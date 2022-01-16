import React from 'react';
import './StartMenu.css';
import logo_2 from '../../assets/logo_2.svg';

export default function StartMenu({ changeTheme, changeGridSize, changePlayers, setStartGame }) {
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
                            onClick={() => changeGridSize('4x4')}
                        >4x4</button>

                        <button 
                            className='btn btn--grid' 
                            id='grid_6' 
                            onClick={() =>changeGridSize('6x6')}
                        >6x6</button>
                    </div>
                </div>
          
                <button 
                    className='start-menu__menu__start btn btn--start' 
                    onClick={() => setStartGame(true)}
                >Start Game</button>
            </div>
        </div>
    )
}
