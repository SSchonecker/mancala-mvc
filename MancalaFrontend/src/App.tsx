import React, { useState } from "react";
import { StartGame } from "./StartGame/StartGame";
import { Play } from "./Play/Play";
import type { GameState } from "./gameState";

export function App() {

    const [ gameState, setGameState ] = useState<GameState | undefined>(undefined);
    const [ errorMessage, setErrorMessage ] = useState("");

    async function tryStartGame(playerOne: string, playerTwo: string) {
        if (!playerOne) {
            setErrorMessage("Player 1 name is required!");
            return;
        }

        if (!playerTwo) {
            setErrorMessage("Player 2 name is required!");
            return;
        }

        setErrorMessage("");

        try {
            const response = await fetch('mancala/api/players', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nameplayer1: playerOne , nameplayer2: playerTwo })
            });
    
            if (response.ok) {
                const gameState = await response.json();
                setGameState(gameState);
            }
            setErrorMessage("Failed to start the game. Try again.");
        } catch (error) {
            setErrorMessage(error.toString());
        }
    }

    if (!gameState) {
        return <StartGame onPlayersConfirmed={tryStartGame}
                          message={errorMessage}
        />
    }

    return <Play gameState={gameState} />
}