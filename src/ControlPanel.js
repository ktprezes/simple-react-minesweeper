import React from "react";
import FlagsCounter from './FlagsCounter';
import ResetBtn from './ResetBtn';
import Timer from './Timer';
import './styles/ControlPanel.css';

function ControlPanel() {
    return (
        <header className="ControlPanel">
            <FlagsCounter />
            <ResetBtn />
            <Timer />
        </header>
    ); /*return() of function ControlPanel()*/
}/* function ControlPanel()*/

export default ControlPanel;
