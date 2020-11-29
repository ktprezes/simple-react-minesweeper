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


    let msg = GameConst.gameStateMsg[props.gameState];
    let msgElem = msg ? <p className="msg">{msg}</p> : '';
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

