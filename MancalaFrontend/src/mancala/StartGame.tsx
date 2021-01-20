import React, { useState } from "react";
import styled from "styled-components";

interface StartGameProps {
    message: string;
    onPlayersConfirmed(playerOne: string, playerTwo: string): void;
}

// a button element with the specified css style applied to it
const StartButton = styled.button`
    font-size: 2em;
    background-color: lightblue;
    border: 2px solid black;
`

// a p element with the specified css style applied to it
const ErrorMessage = styled.p`
    height: 1em;
    color: red;
`;

/**
 * Allows the players to enter their name.
 */
export function StartGame({ message, onPlayersConfirmed }: StartGameProps) {

    const [ playerOne, setPlayerOne ] = useState("");
    const [ playerTwo, setPlayerTwo ] = useState("");
    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {onPlayersConfirmed(playerOne, playerTwo);}
    };

    return <div className="centered">
        <input value={playerOne}
               placeholder="Player 1 name"
               onChange={(e) => setPlayerOne(e.target.value)}
               onKeyPress={handleKeypress}
        />

        <input value={playerTwo}
               placeholder="Player 2 name"
               onChange={(e) => setPlayerTwo(e.target.value)}
               onKeyPress={handleKeypress}
        />

        <ErrorMessage>{message}</ErrorMessage>

        <StartButton onClick={() => onPlayersConfirmed(playerOne, playerTwo)}>
            Play Mancala!
        </StartButton>
    </div>
}