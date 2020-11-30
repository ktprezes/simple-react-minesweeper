import React from "react";
import logo from "./images/bomb.svg";
import './styles/LogoArea.css';

function LogoArea() {
    return (
        <footer className="logoArea">
            <p>&nbsp;&nbsp;&nbsp;M I N E<br />SWEEPER</p>
            <img src={logo} className="appLogo" alt="logo" />
        </footer>
    ); /*return() of function LogoArea()*/
}/* function LogoArea()*/

export default LogoArea;
