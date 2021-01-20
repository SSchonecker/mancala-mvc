import React, { useState } from "react";
import { GameState } from "./gameState";
import styled from "styled-components";

interface PlayProps {
    gameState: GameState;
	message: string;
	onButtonClick(index : number) : void;
}

interface Pit {
    index: number;
    nrOfStones: number;
}

interface GameStatus {
	endOfGame: boolean;
	winner: string;
}

const ErrorMessage = styled.p`
    height: 1em;
    color: red;
`;

export function Play({ gameState, message, onButtonClick }: PlayProps) {
    let pitsOne = gameState.players[0].pits;
    let pitsTwo = gameState.players[1].pits;
    let kalahaOne = pitsOne[pitsOne.length - 1];
    let kalahaTwo = pitsTwo[pitsTwo.length - 1];
    let pitsOnlyOne = pitsOne.slice(0,-1);
    let pitsOnlyTwo = pitsTwo.slice(0,-1);
	
	let resetButtonMessage = "Restart game";
	function resetGame() {
		localStorage.removeItem("myGameState");
		window.location.reload();
	}
	
	let boardCenterMessage = gameState.players[0].name + ", your turn!";
	if (gameState.players[1].hasTurn) {boardCenterMessage = gameState.players[1].name + ", your turn!";}
	
	if (gameState.gameStatus.endOfGame) {
		boardCenterMessage = "The game is over, "+gameState.gameStatus.winner+", you have won!!";
		resetButtonMessage = "Rematch?";
    }
	
    
    return <div className="centered">
        <div className="centered">{gameState.players[0].name} vs {gameState.players[1].name}</div>
        <table id="mancalaboard">
        <tbody>
        <tr>
            <th></th>
            {pitsOnlyTwo.reverse().map(pit =>
                <th key={pit.index}>
                    <span className="pit">
                        {pit.nrOfStones}
                        <br></br>
                        <button className="pitbutton" onClick={() => onButtonClick(pit.index)}>{pit.index}</button>
                    </span>
                </th>
            )}
            <th>{gameState.players[1].name}'s side</th>
        </tr>
        <tr>
            <th key={kalahaTwo.index}>
                <span className="pit">
                    {kalahaTwo.nrOfStones}
                </span>
            </th>
			<th colSpan={pitsOnlyTwo.length}> {boardCenterMessage} </th>
            <th key={kalahaOne.index}>
                <span className="pit">
                    {kalahaOne.nrOfStones}
                </span>
            </th>
        </tr>
        <tr>
            <th>{gameState.players[0].name}'s side</th>
                {pitsOnlyOne.map(pit =>
                    <th key={pit.index}>
                    <span className="pit">
                        {pit.nrOfStones}
                        <br></br>
                        <button className="pitbutton" onClick={() => onButtonClick(pit.index)}>{pit.index}</button>
                    </span>
                    </th>
                )}
            <th></th>
        </tr>
        </tbody>
        </table>
		<ErrorMessage>{message}</ErrorMessage>
		<button className="resetbutton" onClick={() => resetGame() }>{resetButtonMessage}</button>
    </div>
}