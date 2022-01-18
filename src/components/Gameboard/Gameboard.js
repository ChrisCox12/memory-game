import React, { useState, useEffect } from 'react';
import logo_1 from '../../assets/logo_1.svg';
import GamePiece from '../GamePiece/GamePiece';
import './Gameboard.css';

export default function Gameboard({ theme, numPlayers, gridSize }) {
    const [moves, setMoves] =  useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [gameState, setGameState] = useState([]);
    const [firstMove, setFirstMove] = useState({ value: -1, index: -1});
    const [secondMove, setSecondMove] = useState({value: -1, index: -1});
    const [reset, setReset] = useState(false);
    const [flippedPieces, setFlippedPieces] = useState(0);
    const [boardPieces, setBoardPieces] = useState(
        generateBoardPieces()
    );

    useEffect(() => {
        /* console.log(`effect: ${boardPieces}`) */
        let state = [];
        boardPieces.forEach(piece => {
            state.push({
                value: piece,
                flipped: false,
                matched: false
            });
        });
        /* console.log(`state: ${JSON.stringify(state)}`) */
        setGameState(state);
        /* console.log(`Game state: ${JSON.stringify(state)}`) */
    }, [boardPieces]);

    useEffect(() => {
        /* const f = document.querySelectorAll('.GamePiece__piece--flipped'); */
        const f = document.querySelectorAll('.flipped');
        
        if(f.length === 2){
            console.log('two pieces');
            console.log(f[0], f[1]);
        }

        if(firstMove.index !== -1 && secondMove.index !== -1) {
            if(firstMove.value === secondMove.value) {
                console.log('match');

                f.forEach(item => {
                    item.classList.add('matched');
                    // item.setAttribute('disabled', '');
                })
            }
            else {

                console.log('no match');

                setTimeout(() => {
                    f.forEach(item => {
                        if(!item.classList.contains('matched')){
                            item.classList.remove('flipped');
                            item.classList.add('not-flipped');
                            
                        }
                    });
                    setReset(true);
                    setFirstMove({value: -1, index: -1});
                    setSecondMove({value: -1, index: -1});
                }, 1500);
                
                /* f.forEach(item => {
                    console.log(item)
                    item.classList.remove('flipped');
                    item.classList.add('not-flipped')
                    setReset(true);
                }); */
            }
        }
        /* console.log(f[0]) */

    }, [firstMove, secondMove]);

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

            // for randomizing the array
            toReturn.sort(() => Math.random() - 0.5);
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

    function assignMove(move) {
        console.log('firstMove: ', firstMove);
        console.log('move: ', move)
        
        if(firstMove.index === move.index) {
            setFirstMove({value: -1, index: -1});
        }
        else{
            if(firstMove.index === -1) {
                setFirstMove(move);
            }
            else {
                setSecondMove(move);
            }
        }

        /* if(firstMove.value === -1) {
            setFirstMove(move);
            console.log('first move: ' , move);
        }
        else if(firstMove !== null && secondMove === null) {
            setSecondMove(move);
            console.log('second move: ', move);
        } */
        
        

        /* checkForMatch(); */
    }

    function unAssignMove(move) {
        if(firstMove === move) {
            setFirstMove(null);
        }
    }

    function checkForMatch() {
        console.log('checking');

        if(firstMove.index !== -1 && secondMove.index !== -1) {
            if(firstMove.value === secondMove.value) {
                console.log('match');
            }
            else {
                console.log('no match');
            }
        }
        /* console.log(`flipped pieces: ${flippedPieces}`) */
        /* if(flippedPieces.length === 2) {

        } */
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
                    {boardPieces.map((piece, index) => {
                        return (
                            <GamePiece 
                                value={piece} 
                                key={index} 
                                index={index}
                                firstMove={firstMove}
                                setFirstMove={setFirstMove}
                                secondMove={secondMove}
                                setSecondMove={setSecondMove}
                                assignMove={assignMove}
                                flippedPieces={flippedPieces}
                                setFlippedPieces={setFlippedPieces}
                                unAssignMove={unAssignMove}
                                reset={reset}
                                setReset={setReset}
                            />
                        );
                    })}
                </div>
            }

            {gridSize === 6 && 
                <div>6x6 grid</div>
            }

            <button onClick={() => console.log(firstMove)}>First Move</button>
            <button onClick={() => console.log(secondMove)}>Second Move</button>
            <button onClick={() => console.log(flippedPieces)}>Flipped Pieces</button>
            <button onClick={() => console.log(reset)}>Reset</button>
        </div>
    )
}
