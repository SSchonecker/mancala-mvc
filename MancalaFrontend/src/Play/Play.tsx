import React from "react";
import type { GameState } from "../gameState";
import "./Play.css";

interface PlayProps {
    gameState: GameState;
}

export function Play({ gameState }: PlayProps) {
    return <div>
        <p>{gameState.players[0].name} vs {gameState.players[1].name}</p>
        <p>Todo...</p>
    </div>
}