import React from "react";
import ControlPanel from './ControlPanel';
import Field from "./Field";
import LogoArea from "./LogoArea";
import './styles/Game.css';

const Game = () => {

    return (
        <div className="minesweepergame"
                onContextMenu={(e) => e.preventDefault()}
        >
            <ControlPanel />
            <Field />
            <LogoArea />
        </div>
    ); // return() of function Game()
}; // Game()

export default Game;
