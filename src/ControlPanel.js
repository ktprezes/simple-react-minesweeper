import React from "react";
import PropTypes from 'prop-types';
import FlagsCounter from './FlagsCounter';
import ResetBtn from './ResetBtn';
import Timer from './Timer';
import './styles/ControlPanel.css';

function ControlPanel(props) {
    return (
        <header className="ControlPanel">
            <FlagsCounter marked={props.marked}/>
            <ResetBtn />
            <Timer />
        </header>
    ); /*return() of function ControlPanel()*/
}/* function ControlPanel()*/

ControlPanel.propTypes = {
    marked: PropTypes.number.isRequired
}

export default ControlPanel;
