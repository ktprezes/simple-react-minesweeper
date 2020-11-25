import React from "react";
import PropTypes from 'prop-types';
import './styles/FlagsCounter.css';

function FlagsCounter(props) {
    let bombs = props.marked;

    // add some spaces between digits of the counter
    return (
        <div className="flagsCounter">
            {String(bombs).padStart(3,'0').split('').join(' ')}
        </div>
    ); /*return() of function FlagsCounter()*/
}/* function FlagsCounter()*/

FlagsCounter.propTypes = {
    marked: PropTypes.number.isRequired
}

export default FlagsCounter;