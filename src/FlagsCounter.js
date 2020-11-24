import React, {useState} from "react";
import GameConst from "./GameConst";
import './styles/FlagsCounter.css';

function FlagsCounter() {
    const [mines, setMines] = useState(GameConst.noOfBombs);
    return (
        <div className="flagsCounter">
            {String(mines).padStart(3,'0')}
        </div>
    ); /*return() of function FlagsCounter()*/
}/* function FlagsCounter()*/

export default FlagsCounter;
