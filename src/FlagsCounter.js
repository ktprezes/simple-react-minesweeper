import React from "react";
import PropTypes from 'prop-types';
import './styles/FlagsCounter.css';

function FlagsCounter(props) {
    let count = props.marked;

    // add some spaces between digits of the counter
    //.join(' ')}
    let counterString = String(count).padStart(3,'0').split('').map((digit, i)=>{
        let cl = 'd'+i;
        return <span className={cl} key={cl} >{digit}</span>
    }).concat();

    return (
        <div className="flagsCounter">
            {counterString}
        </div>
    ); /*return() of function FlagsCounter()*/
}/* function FlagsCounter()*/

FlagsCounter.propTypes = {
    marked: PropTypes.number.isRequired
}

export default FlagsCounter;
