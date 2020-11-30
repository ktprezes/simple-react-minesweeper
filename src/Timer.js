import React from "react";
import PropTypes from 'prop-types';
import GameConst from "./GameConst";
import './styles/Timer.css';


function Timer(props) {
    let timeElapsed = props.timeElapsed;

    return (
        <div className="timer">
            {Math.floor(timeElapsed/GameConst.secPerMinute)}<span>:</span>{String(timeElapsed % GameConst.secPerMinute).padStart(2,'0')}
        </div>
    ); /*return() of function Timer()*/
}/* function Timer()*/


Timer.propTypes = {
    timeElapsed: PropTypes.number.isRequired
}


export default Timer;
