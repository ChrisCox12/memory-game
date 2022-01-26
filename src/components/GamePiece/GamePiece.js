import React, { useState, useEffect } from 'react';
import './GamePiece.css';

export default function GamePiece({ value, index, assignMove, reset, setReset, isFlipped, isMatched, theme }) {
    const [pieceValue, setPieceValue] = useState('');
    const [pieceIndex, setPieceIndex] = useState(-1);
    const [flipped, setFlipped] = useState(false);
    const [pieceMatched, setPieceMatched] = useState(false);

    useEffect(() => {
        setPieceValue(value);
        setPieceIndex(index);
        setFlipped(isFlipped);
        setPieceMatched(isMatched);
    }, [value, index, isFlipped, isMatched]);


    useEffect(() => {
        const toFlip = document.getElementById(index);

        if(flipped) {
            toFlip.classList.remove('not-flipped');
            toFlip.classList.add('flipped');
        }
        else {
            if(toFlip.classList.contains('flipped')){
                toFlip.classList.remove('flipped');
                toFlip.classList.add('not-flipped');    
            }
        }

        if(pieceMatched) {
            toFlip.classList.add('matched');
        }

    }, [flipped, pieceIndex, index, pieceMatched]);

    useEffect(() => {
        const toReset = document.getElementById(pieceIndex);

        if(reset) {
            if(!toReset.classList.contains('matched')){
                setFlipped(false);
                setReset(false);
            }    
        }
    }, [reset, setReset, pieceIndex]);


    function flipPiece() {
        setFlipped(!flipped);
        assignMove({
            value: pieceValue,
            index: pieceIndex,
        });
    }

    function determineValue() {
        if(theme === 'numbers') {
            return pieceValue;
        }
        else {
            return <img src={pieceValue} alt='icon' />;
        }
    }
    

    return (
        <div className="GamePiece not-flipped" onClick={flipPiece} id={index}>
            <div className="GamePiece__content">
                {flipped ? 
                    determineValue() 
                    : null
                }
            </div>
        </div>
    )
}
