import React from "react";
import PropTypes from 'prop-types';
import GameConst from "./GameConst";
import CellClass from "./CellClass";
import Row from './Row';
import './styles/Field.css';

function Field(props) {
    const rowNumbers = [...Array(GameConst.rows).keys()];

    const rows = rowNumbers.map((no) => {
        let rowNo = no.toString();
        return <Row key={'r'+rowNo}
                    r={rowNo}
                    cellRow={props.cellArr[no]}
                    myCellClickHandler={props.myCellClickHandler}
                />
    });


    let gameState = props.gameState;
    let msg = GameConst.gameStateMsg[gameState];
    let msgElemClass = gameState === 'victory'
        ? "msg win"
        : gameState === 'defeat'
            ? "msg lost"
            : "msg";
    let msgElem = msg ? <p
        className={msgElemClass}
    >{msg}</p> : '';
    // console.log('Field Msg:', msg);

    return (
        <main className="Field">
            {rows}
            {msgElem}
        </main>
    ); /*return() of function Field()*/
}/* function Field()*/

Field.propTypes = {
    cellArr: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(CellClass))).isRequired,
    gameState: PropTypes.string.isRequired,
    myCellClickHandler: PropTypes.func.isRequired
}


export default Field;

