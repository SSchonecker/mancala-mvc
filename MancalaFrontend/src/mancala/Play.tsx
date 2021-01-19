import React, { useState } from "react";
import { GameState } from "./gameState";

interface PlayProps {
    gameState: GameState;
}

interface Pit {
    index: number;
    nrOfStones: number;
}

export function Play({ gameState }: PlayProps) {
    let pitsOne = gameState.players[0].pits;
    let pitsTwo = gameState.players[1].pits;
    let kalahaOne = pitsOne[pitsOne.length - 1];
    let kalahaTwo = pitsTwo[pitsTwo.length - 1];
    let pitsOnlyOne = pitsOne.slice(0,-1);
    let pitsOnlyTwo = pitsTwo.slice(0,-1);
    const floater: React.CSSProperties = {
        float:"right"
    };
    
    function SelectPit({index} : Pit) {
        console.log("Selected pit: "+ index);
        console.log("But I'm no sure what to do with it... I am terribly sorry");
    }
    
    return <div>
        <p>{gameState.players[0].name} vs {gameState.players[1].name}</p>
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
            <th colSpan={pitsOnlyTwo.length}> Player's turn text here! </th>
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