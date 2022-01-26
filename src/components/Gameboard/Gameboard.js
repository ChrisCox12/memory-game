import React, { useState, useEffect } from 'react';
import logo_1 from '../../assets/logo_1.svg';
import GamePiece from '../GamePiece/GamePiece';
import './Gameboard.css';
import ambulance from '../../assets/Font Awesome Icons/ambulance-solid.svg';
import bug from '../../assets/Font Awesome Icons/bug-solid.svg';
import crow from '../../assets/Font Awesome Icons/crow-solid.svg';
import fish from '../../assets/Font Awesome Icons/fish-solid.svg';
import fort from '../../assets/Font Awesome Icons/fort-awesome-brands.svg';
import gamepad from '../../assets/Font Awesome Icons/gamepad-solid.svg';
import hamburger from '../../assets/Font Awesome Icons/hamburger-solid.svg';
import helicopter from '../../assets/Font Awesome Icons/helicopter-solid.svg';
import infinity from '../../assets/Font Awesome Icons/infinity-solid.svg';
import key from '../../assets/Font Awesome Icons/key-solid.svg'; 
import magnet from '../../assets/Font Awesome Icons/magnet-solid.svg';
import pizza from '../../assets/Font Awesome Icons/pizza-slice-solid.svg';
import plane from '../../assets/Font Awesome Icons/plane-solid.svg';
import plug from '../../assets/Font Awesome Icons/plug-solid.svg';
import screwdriver from '../../assets/Font Awesome Icons/screwdriver-solid.svg';
import spider from '../../assets/Font Awesome Icons/spider-solid.svg';
import tv from '../../assets/Font Awesome Icons/tv-solid.svg';
import viruses from '../../assets/Font Awesome Icons/viruses-solid.svg';


export default function Gameboard({ theme, numPlayers, gridSize, setStartGame, setTheme, setNumPlayers, setGridSize }) {
    const [moves, setMoves] =  useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [firstMove, setFirstMove] = useState({ value: -1, index: -1 });
    const [secondMove, setSecondMove] = useState({ value: -1, index: -1 });
    const [reset, setReset] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [active, setActive] = useState(false);
    const [boardPieces, setBoardPieces] = useState([]);
    const [playerScores, setPlayerScores] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [nextPlayer, setNextPlayer] = useState(1);
    

    useEffect(() => {
        const storedGameState = JSON.parse( localStorage.getItem('gameState') );
        const gameBoardStats = document.querySelector('.Gameboard__stats__player-scores');

        if(storedGameState !== null) {
            if(numPlayers > 1) {
                setCurrentPlayer(storedGameState.currentPlayer);
                setNextPlayer(storedGameState.nextPlayer);
                setPlayerScores(storedGameState.playerScores);

                switch(numPlayers) {
                    case 2:
                        gameBoardStats.classList.add('two-player');
                        break;
                    case 3:
                        gameBoardStats.classList.add('three-player');
                        break;
                    case 4:
                        gameBoardStats.classList.add('four-player');
                        break;
                    default:
                        break;
                }
            }
            else {
                setMoves(storedGameState.moves);
                setMinutes(storedGameState.time.minutes);
                setSeconds(storedGameState.time.seconds);
            }

            setBoardPieces(storedGameState.boardPieces);
        }
        else {
            let values = [];
            let toSet = [];
            let nums = [];
            let icons = [];

            switch(numPlayers) {
                case 2:
                    gameBoardStats.classList.add('two-player');
                    setPlayerScores([0, 0]);
                    break;
                case 3:
                    gameBoardStats.classList.add('three-player');
                    setPlayerScores([0, 0, 0]);
                    break;
                case 4:
                    gameBoardStats.classList.add('four-player');
                    setPlayerScores([0, 0, 0, 0]);
                    break;
                default:
                    break;
            }

            // generate state 
            if(gridSize === 4) {
                if(theme === 'numbers') {
                    for(let x = 0; x < 8; x++) {
                        nums.push(x);
                    }

                    values = [...nums, ...nums];
                }
                else {
                    icons = [
                        ambulance, bug,
                        crow, fish,
                        fort, gamepad,
                        hamburger, helicopter
                    ];

                    values = [...icons, ...icons];
                }

                // for randomizing the array
                values.sort(() => Math.random() - 0.5);

                for(let i = 0; i < 16; i++) {
                    toSet.push({
                        value: values[i],
                        index: i,
                        flipped: false,
                        matched: false
                    });
                }
            }
            else {
                if(theme === 'numbers') {
                    for(let x = 0; x < 18; x++) {
                        nums.push(x);
                    }

                    values = [...nums, ...nums];
                }
                else {
                    icons = [
                        ambulance, bug,
                        crow, fish,
                        fort, gamepad,
                        hamburger, helicopter,
                        infinity, key,
                        magnet, pizza, 
                        plane, plug, 
                        screwdriver, tv,
                        spider, viruses
                    ];

                    values = [...icons, ...icons];
                }

                // for randomizing the array
                values.sort(() => Math.random() - 0.5);

                for(let i = 0; i < 36; i++) {
                    toSet.push({
                        value: values[i],
                        index: i,
                        flipped: false,
                        matched: false
                    });
                }
            }

            setBoardPieces(toSet);
        }

        console.log('stored game state: ', storedGameState)
        console.log(document.querySelectorAll('.Gameboard__stats__player-scores > div'));

    }, []);

    useEffect(() => {
        let timeout1;
        let gameStateToSave;

        if(active) {
            timeout1 = setTimeout(() => {
                if(numPlayers > 1) {
                    gameStateToSave = {
                        boardPieces: boardPieces,
                        playerScores: playerScores,
                        currentPlayer: currentPlayer,
                        nextPlayer: nextPlayer,
                        numPlayers: numPlayers,
                        gridSize: gridSize,
                        theme: theme
                    };
                }
                else {
                    if(seconds === 59) {
                        const nM = minutes + 1;
                        setSeconds(0);
                        setMinutes(nM);
                    }
                    else {
                        const nS = seconds + 1;
                        setSeconds(nS);
                    }

                    gameStateToSave = {
                        boardPieces: boardPieces,
                        time: {
                            minutes: minutes,
                            seconds: seconds
                        },
                        moves: moves,
                        numPlayers: numPlayers,
                        gridSize: gridSize,
                        theme: theme
                    };
                }
                
                localStorage.setItem('gameState', JSON.stringify(gameStateToSave));
            }, 1000);
        }


        //  Used for cleaning up the timeout
        return () => {
            clearTimeout(timeout1);
        };
           
    }, [seconds, minutes, active, boardPieces, moves, playerScores, currentPlayer, nextPlayer, numPlayers, gridSize, theme]);

    useEffect(() => {
        let timeout2;
        const allFlipped = document.querySelectorAll('.flipped');
        const gameBoard = document.querySelector('.Gameboard__board');
        const fM = document.getElementById(firstMove.index);
        const sM = document.getElementById(secondMove.index);

        if(firstMove.index !== -1 && secondMove.index !== -1) {
            gameBoard.classList.add('no-click');

            timeout2 = setTimeout(() => {
                if(firstMove.value === secondMove.value) {
                    //console.log('match');

                    fM.classList.add('matched');
                    sM.classList.add('matched');

                    boardPieces[firstMove.index].matched = true;
                    boardPieces[secondMove.index].matched = true;
                    boardPieces[firstMove.index].flipped = true;
                    boardPieces[secondMove.index].flipped = true;

                    if(numPlayers > 1){
                        let scoreArray = [...playerScores];
                        let newScore = scoreArray[currentPlayer] + 1;
                        scoreArray[currentPlayer] = newScore;
                        setPlayerScores(scoreArray);
                    }
                }
                else {
                    //console.log('no match');

                    allFlipped.forEach(item => {
                        if(!item.classList.contains('matched')) {
                            item.classList.remove('flipped');
                            item.classList.add('not-flipped');
                        }
                    });
                    setReset(true);
                }

                setFirstMove({value: -1, index: -1});
                setSecondMove({value: -1, index: -1});

                gameBoard.classList.remove('no-click');

                if(numPlayers > 1) {
                    const players = document.querySelectorAll('.Gameboard__stats__player-scores > div');

                    if(currentPlayer === (players.length - 1)) {
                        players[currentPlayer].classList.remove('testing');
                        players[0].classList.add('testing');

                        setCurrentPlayer(0);
                        setNextPlayer(1);
                    }
                    else {
                        players[currentPlayer].classList.remove('testing');
                        players[nextPlayer].classList.add('testing');

                        let curr = currentPlayer + 1;
                        let next = nextPlayer + 1;

                        setCurrentPlayer(curr);
                        setNextPlayer(next);
                    }
                }
            }, 1500);
        }

        return () => {
            clearTimeout(timeout2);
        };
    }, [firstMove, secondMove, boardPieces, currentPlayer, nextPlayer, numPlayers, playerScores]);


    function toggleOverlay() {
        setShowMenu(!showMenu);
    }

    function assignMove(move) {
        console.log('firstMove: ', firstMove);
        console.log('move: ', move)

        const n_M = moves + 1;
        setMoves(n_M);
        
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

        if(!active){
            setActive(true);
        }
    }

    function restartGame() {
        const restarted = [...boardPieces];
        const allMatched = document.querySelectorAll('.matched');

        allMatched.forEach(piece => {
            piece.classList.remove('matched');
        });

        restarted.forEach(piece => {
            piece.flipped = false;
            piece.matched = false;
        });

        if(numPlayers > 1) {
            let defaultScores = [...playerScores];
            
            for(let i = 0; i < defaultScores.length; i++) {
                defaultScores[i] = 0;
            }
            
            setPlayerScores(defaultScores);
            setCurrentPlayer(0);
            setNextPlayer(1);
        }
        else {
            setMinutes(0);
            setSeconds(0);
            setMoves(0); 
        }

        setBoardPieces(restarted);
        toggleOverlay();
    }

    function startNewGame() {
        localStorage.removeItem('gameState');
        setTheme('numbers');
        setNumPlayers(1);
        setGridSize(4);
        setStartGame(false);
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
                            <button 
                                className='Gameboard__header__menu-overlay__restart btn btn--restart'
                                onClick={restartGame}
                            >Restart</button>

                            <button 
                                className='Gameboard__header__menu-overlay__new-game btn btn--new-game'
                                onClick={startNewGame}
                            >New Game</button>

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
                                value={piece.value} 
                                key={index} 
                                index={index}
                                assignMove={assignMove}
                                reset={reset}
                                setReset={setReset}
                                isFlipped={piece.flipped}
                                isMatched={piece.matched}
                                theme={theme}
                            />
                        );
                    })}
                </div>
            }

            {gridSize === 6 && 
                <div className='Gameboard__board board--6x6'>
                    {boardPieces.map((piece, index) => {
                        return (
                            <GamePiece 
                                value={piece.value} 
                                key={index} 
                                index={index}
                                assignMove={assignMove}
                                reset={reset}
                                setReset={setReset}
                                isFlipped={piece.flipped}
                                isMatched={piece.matched}
                                theme={theme}
                            />
                        );
                    })}
                </div>
            }

            <div className='Gameboard__stats'>
                {numPlayers === 1 ?
                    <>
                        <div className='Gameboard__stats__time-counter'>
                            <div className='Gameboard__stats__time-counter__title'>Time</div>

                            <div className='Gameboard__stats__time-counter__time'>
                                {minutes > 0 ? 
                                    <>{minutes}:{seconds}</> 
                                    : 
                                    <>{seconds}</>
                                }
                            </div>
                        </div>

                        <div className='Gameboard__stats__move-counter'>
                            <div className='Gameboard__stats__move-counter__title'>Moves</div>

                            <div className='Gameboard__stats__move-counter__moves'>{moves}</div>
                        </div>
                    </>
                    : 
                    <>
                        <div className='Gameboard__stats__player-scores'>
                                {playerScores.map((playerScore, index) => {
                                    let playerString = 'player_' + index;
                                    let playerNum = index + 1;

                                    return (
                                        <div key={playerString}>
                                            <div className='Gameboard__stats__player-scores__player'>
                                                P{playerNum}
                                            </div>

                                            <div className='Gameboard__stats__player-scores__player-score'>
                                                {playerScore}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </> 
                }
                
            </div>

            <button onClick={() => console.log(firstMove)}>First Move</button>
            <button onClick={() => console.log(secondMove)}>Second Move</button>
            <button onClick={() => console.log(reset)}>Reset</button>
            <button onClick={() => console.log(boardPieces)}>BoardPieces</button>
        </div>
    )
}
