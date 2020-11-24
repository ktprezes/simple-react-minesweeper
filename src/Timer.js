import React, {useState} from "react";
import GameConst from "./GameConst";
import './styles/Timer.css';


function Timer() {
    const [timeElapsed, setTimeElapsed] = useState(0);
    /* this is my version of timer inside the <div> tag:
        {Math.floor(timeElapsed/GameConst.secPerMinute)}<span>:</span>{String(timeElapsed % GameConst.secPerMinute).padStart(2,'0')}
       but this doesn't pass the JBA tests
    */

    return (
        <div className="timer">
            {Math.floor(timeElapsed/GameConst.secPerMinute)}<span>:</span>{String(timeElapsed % GameConst.secPerMinute).padStart(2,'0')}
        </div>
    ); /*return() of function Timer()*/
}/* function Timer()*/

export default Timer;
