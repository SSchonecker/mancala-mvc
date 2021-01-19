import React, { useState } from "react";
import { GameState } from "./gameState";
import styled from "styled-components";

interface PlayProps {
    gameState: GameState;
}

interface Pit {
    index: number;
    nrOfStones: number;
}

const ErrorMessage = styled.p`
    height: 1em;
    color: red;
`;

export function Play({ gameState }: PlayProps) {
    let pitsOne = gameState.players[0].pits;
    let pitsTwo = gameState.players[1].pits;
    let kalahaOne = pitsOne[pitsOne.length - 1];
    let kalahaTwo = pitsTwo[pitsTwo.length - 1];
    let pitsOnlyOne = pitsOne.slice(0,-1);
    let pitsOnlyTwo = pitsTwo.slice(0,-1);
	let errorMessage = "";
	let playersTurnMessage = gameState.players[0].name + ", your turn!";
		if (gameState.players[1].hasTurn) {playersTurnMessage = gameState.players[1].name + ", your turn!";}
    
    async function SelectPit({index} : Pit) {		
		try {
            const urlPath = "mancala/api/play/"+ index;
            console.log("I'll try sending the move to the server");
            const response = await fetch(urlPath, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json'
                },
            });
    
            if (response.ok) {
				if (response.status === 200) {
					const newState = await response.json();
					console.log(newState);
					errorMessage =  "";
				}
				else {
					errorMessage = "Invalid move! Try again";
				}
			}
        } catch (error) {
            console.log(error.toString());
		}
        // add message on invalid move
        //return <Play gameState={gameState}  />
    }
    
    return <div>
        <p>{gameState.players[0].name} vs {gameState.players[1].name}</p>
		<ErrorMessage>{errorMessage}</ErrorMessage>
        <table id="mancalaboard">
        <tbody>
        <tr>
            <th></th>
            {pitsOnlyTwo.reverse().map(pit =>
                <th key={pit.index}>
                    <span className="pit">
                        {pit.nrOfStones}
                        <br></br>
                        <button className="pitbutton" onClick={() => SelectPit(pit)}>{pit.index}</button>
                    </span>
                </th>
            )}
            <th></th>
        </tr>
        <tr>
            <th key={kalahaTwo.index}>
                <span className="pit">
                    {kalahaTwo.nrOfStones}
                </span>
            </th>
			<th colSpan={pitsOnlyTwo.length}> {playersTurnMessage} </th>
            <th key={kalahaOne.index}>
                <span className="pit">
                    {kalahaOne.nrOfStones}
                </span>
            </th>
        </tr>
        <tr>
            <th></th>
                {pitsOnlyOne.map(pit =>
                    <th key={pit.index}>
                    <span className="pit">
                        {pit.nrOfStones}
                        <br></br>
                        <button className="pitbutton" onClick={() => SelectPit(pit)}>{pit.index}</button>
                    </span>
                    </th>
                )}
            <th></th>
        </tr>
        </tbody>
        </table>
    </div>
}