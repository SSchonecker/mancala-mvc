import React, { useState } from "react";
import "./StartGame.css";

interface StartGameProps {
    message: string;
    onPlayersConfirmed(playerOne: string, playerTwo: string): void;
}

/**
 * Allows the players to enter their name.
 */
export function StartGame({ message, onPlayersConfirmed }: StartGameProps) {

    const [ playerOne, setPlayerOne ] = useState("");
    const [ playerTwo, setPlayerTwo ] = useState("");

    return <div>
        <input value={playerOne}
               placeholder="Player 1 name"
               onChange={(e) => setPlayerOne(e.target.value)}
        />

        <input value={playerTwo}
               placeholder="Player 2 name"
               onChange={(e) => setPlayerTwo(e.target.value)}
        />

        <p className="errorMessage">{message}</p>

        <button className="startGameButton" onClick={() => onPlayersConfirmed(playerOne, playerTwo)}>
            Play Mancala!
        </button>
    </div>
}