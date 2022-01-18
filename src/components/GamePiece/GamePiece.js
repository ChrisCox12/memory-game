import React, { useState, useEffect } from 'react';
import './GamePiece.css';

export default function GamePiece({ 
    value, index, firstMove, setFirstMove, 
    secondMove, setSecondMove, assignMove, flippedPieces, setFlippedPieces,
    unAssignMove, reset, setReset }) {
    const [pieceValue, setPieceValue] = useState('');
    const [pieceIndex, setPieceIndex] = useState(-1);
    const [flipped, setFlipped] = useState(false);
    const [pieceMatched, setPieceMatched] = useState(false);

    useEffect(() => {
        setPieceValue(value);
        setPieceIndex(index);
        /* console.log(`piece value: ${value}`); */
        /* console.log(`value: ${value}, index: ${index}`) */
    }, [value, index]);


    useEffect(() => {
        const toFlip = document.getElementById(index);


        if (flipped) {
            /* console.log('toFlip: ', toFlip);
            console.log('flipped'); */

            toFlip.classList.remove('not-flipped');
            toFlip.classList.add('flipped');
        }
        else {
            if(toFlip.classList.contains('flipped')){
                /* console.log('contains') */
                toFlip.classList.remove('flipped');
                toFlip.classList.add('not-flipped');    
            }
        }

    }, [flipped, pieceIndex, index]);

    useEffect(() => {
        /* const toReset = document.querySelectorAll('.flipped'); */
        const toReset = document.getElementById(pieceIndex);

        if(reset) {
            if(!toReset.classList.contains('matched')){
                setFlipped(false);
                setReset(false);
            }    
        }
    }, [reset, setReset, pieceIndex]);

    /* useEffect(() => {
        const f = document.querySelectorAll('.GamePiece__piece--flipped');
        
        if(f.length === 2){
            console.log('two pieces')
            console.log(f[0], f[1])
        }
    }, [flipped, pieceIndex]); */


    function flipPiece() {
        setFlipped(!flipped);
        /* console.log('flipped: ', flipped) */
        /* console.log(`card clicked: ${e.target}`);
        console.log(e.target); */

        /* assignMoves(); */
        assignMove({
            value: pieceValue,
            index: pieceIndex,
        });
    }

    /* function assignMoves() {
        if(firstMove === null){
            console.log('null first move')
            setFirstMove({
                value: pieceValue,
                pieceIndex: pieceIndex
            });
        }
        else{
            console.log('first move not null')
            setSecondMove({
                value: pieceValue,
                pieceIndex: pieceIndex
            });
        }
    } */

    

    return (
        <div className="GamePiece not-flipped" onClick={flipPiece} id={index}>
            {/* flipped ? 
                <div className="GamePiece__piece--flipped">{pieceValue}</div> 
                : <div className="GamePiece__piece--not-flipped"></div> */
            }
            <div className="GamePiece__content">
                {flipped ? 
                    pieceValue 
                    : null
                }
            </div>
        </div>
    )
}
