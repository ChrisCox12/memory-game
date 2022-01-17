import React, { useState, useEffect } from 'react';
import logo_1 from '../../assets/logo_1.svg';
import './Gameboard.css';

export default function Gameboard({ theme, numPlayers, gridSize }) {
    const [moves, setMoves] =  useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [boardPieces, setBoardPieces] = useState(
        generateBoardPieces()
    );

    function generateBoardPieces() {
        if(gridSize === 4) {
            return generatePieces4();
        }
        else {
            return generatePieces6();
        }
    }

    function generatePieces4() {
        let toReturn = [];

        if(theme === 'numbers') {
            let nums = [];
            
            while(nums.length < 8) {
                let rand = Math.floor(Math.random() * 8);

                if(!nums.includes(rand)) {
                    nums.push(rand);
                }
            }

            toReturn = [...nums, ...nums];
        }

        /* console.log(`toReturn: ${toReturn}`) */
        return toReturn;
    }

    function generatePieces6() {
        let toReturn = [];

        if(theme === 'numbers') {
            let nums = [];
            
            while(nums.length < 16) {
                let rand = Math.floor(Math.random() * 16);

                if(!nums.includes(rand)) {
                    nums.push(rand);
                }
            }

            toReturn = [...nums, ...nums];
        }

        /* console.log(`toReturn: ${toReturn}`) */
        return toReturn;
    }

    function toggleOverlay() {
        setShowMenu(!showMenu);
    }

    return (
        <div className="Gameboard">
            <div className="Gameboard__header">
                <div className="Gameboard__header__logo">
                    <img src={logo_1} alt='Memory game logo' />
                </div>

                <div className="Gameboard__header__buttons">
                    <button className="Gameboard__header__buttons__restart btn btn--restart">
                        Restart
                    </button>

                    <button className="Gameboard__header__buttons__new-game btn btn--new-game">
                        New Game
                    </button>

                    <button 
                        className="Gameboard__header__buttons__menu btn btn--menu" 
                        onClick={toggleOverlay}
                    >Menu</button>
                </div>

                {showMenu && 
                    <div className="Gameboard__header__menu-overlay">
                        <div className="Gameboard__header__menu-overlay__content">
                            <button className='Gameboard__header__menu-overlay__restart btn btn--restart'>Restart</button>
                            <button className='Gameboard__header__menu-overlay__new-game btn btn--new-game'>New Game</button>
                            <button 
                                className='Gameboard__header__menu-overlay__resume btn btn--resume' 
                                onClick={toggleOverlay}
                            >Resume Game</button>
                        </div>
                    </div>
                }
            </div>
            gameboard
            <button onClick={() => console.log(`boardPieces: ${boardPieces}`)}>Click</button>

            {gridSize === 4 && 
                <div className='Gameboard__board board--4x4'>
                    
                </div>
            }

            {gridSize === 6 && 
                <div>6x6 grid</div>
            }
        </div>
    )
}
