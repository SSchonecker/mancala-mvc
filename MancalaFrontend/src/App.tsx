import React, { useState, useEffect } from "react";
import { StartGame } from "./mancala/StartGame";
import { Play } from "./mancala/Play";
import { GameState } from "./mancala/gameState";

export function App() {

    const [ gameState, setGameState ] = useState<GameState | undefined>(undefined);
		
	useEffect(() => {
		const json = localStorage.getItem("myGameState");
		if (json){
		if (json.length > 10) {
			const savedState = JSON.parse(json);
			setGameState(savedState);
		}}
	}, []);
 
	useEffect(() => {
		const json = JSON.stringify(gameState);
		localStorage.setItem("myGameState", json);
	}, [gameState]);
	
    const [ errorMessage, setErrorMessage ] = useState("");
	const [ playError, setPlayError ] = useState("");

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
			localStorage.removeItem("myGameState");
			
        } catch (error) {
            setErrorMessage(error.toString());
			localStorage.removeItem("myGameState");
        }
    }

    if (!gameState) {
        return <StartGame onPlayersConfirmed={tryStartGame}
                          message={errorMessage}
        />
    }
	
	return <Play 	gameState={gameState} 
					message={playError}
					onButtonClick={SelectPit}
	/>
	
	async function SelectPit(index : number) {		
		setPlayError("");
		try {
            const urlPath = "mancala/api/play/"+ index;
            const response = await fetch(urlPath, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json'
                },
            });
    
            if (response.ok) {
				if (response.status === 200) {
					const newState = await response.json();
					setGameState(newState);
				}
				else {
					setPlayError("Invalid move! Try again");
				}
			}
        } catch (error) {
            setPlayError(error.toString());
			localStorage.removeItem("myGameState");
		}
    }
}