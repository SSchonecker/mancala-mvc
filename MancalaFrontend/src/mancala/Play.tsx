import React from "react";
import { GameState } from "./gameState";

interface PlayProps {
    gameState: GameState;
}

export function Play({ gameState }: PlayProps) {
    let [ pitsOne , pitsTwo ] = [gameState.players[0].pits, gameState.players[1].pits];
    let kalahaOne = pitsOne[pitsOne.length - 1];
    let kalahaTwo = pitsTwo[pitsTwo.length - 1];
    let pitsOnlyOne = pitsOne.slice(0,-1);
    let pitsOnlyTwo = pitsTwo.slice(0,-1);
    const floater: React.CSSProperties = {
        float:"right"
    };
    
    return <div>
        <p>{gameState.players[0].name} vs {gameState.players[1].name}</p>
        <div id="mancalaboard">
        
        {pitsOnlyTwo.reverse().map(pit =>
            <span className="pit" key={pit.index}>
                {pit.nrOfStones}
                <br></br>
                <button className="pitbutton" onClick={() => console.log("Pit selected!")}>{pit.index}</button>
            </span>
        )}
        <br/>
        <span className="pit" key={kalahaTwo.index}>
            {kalahaTwo.nrOfStones}
        </span>
        
        <span className="pit" key={kalahaOne.index} style={floater}>
            {kalahaOne.nrOfStones}
        </span>
        <br/>
        {pitsOnlyOne.slice(0,-1).map(pit =>
            <span className="pit" key={pit.index}>
                {pit.nrOfStones}
                <br></br>
                <button className="pitbutton" onClick={() => console.log("Pit selected!")}>{pit.index}</button>
            </span>
        )}
        </div>
    </div>
}