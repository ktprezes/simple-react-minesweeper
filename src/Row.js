import React from "react";
import PropTypes from 'prop-types';
import GameConst from "./GameConst";
import Cell from './Cell';
import CellClass from "./CellClass";
import './styles/Row.css';


function Row (props) {
    const rowNo = props.r;
    const colNumbers = [...Array(GameConst.cols).keys()];
    const cells = colNumbers.map(
      (no) => {
        let colNo = no.toString();
/*
        // create random 'CellClass' object - code used for testing purposes
        // requires the 'cellStates' to be imported from the "./CellClass" file
        let cellObj = new CellClass(
            Math.floor(Math.random() * 2),
            cellStates[Math.floor(Math.random() * cellStates.length)]
        );
*/
        //console.log(rowNo, colNo, cellObj);
        return <Cell key={'r' + rowNo + 'c' + colNo}
                     r={rowNo}
                     c={colNo}
                     cellObj={props.cellRow[no]}
                     myCellClickHandler={props.myCellClickHandler}
               />
      }
    ); // const cells = colNumbers.map(

    return (
        <div className="Row" r={rowNo}>
            {cells}
        </div>
    ); /*return() of function Row()*/
}/* function Row()*/


Row.propTypes = {
  r: PropTypes.string.isRequired,
  cellRow: PropTypes.arrayOf(PropTypes.instanceOf(CellClass)).isRequired,
  myCellClickHandler: PropTypes.func.isRequired
};

export default Row;
