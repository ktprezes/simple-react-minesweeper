import React from "react";
import PropTypes from 'prop-types';
import './styles/FlagsCounter.css';

function FlagsCounter(props) {
    let count = props.marked;

    // add some spaces between digits of the counter
    // this is my version of the counter - but this doesn't pass the JBA tests

    let counterString = String(count).padStart(3,'0').split('').map((digit, i)=>{
        let cl = 'd'+i;
        return <span className={cl} key={cl} >{digit}</span>
    }).concat();

    // just to pass the JBA tests
    // let counterString = String(count).padStart(3,'0');

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
