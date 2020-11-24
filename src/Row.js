import React from "react";
import PropTypes from 'prop-types';
import GameConst from "./GameConst";
import Cell from './Cell';
import CellClass, {cellStates} from "./CellClass";
import './styles/Row.css';

function Row (props) {
    const rowNo = props.r;
    const colNumbers = [...Array(GameConst.cols).keys()];
    const cells = colNumbers.map(
      (no) => {
        let colNo = no.toString();
        let cellObj = new CellClass(
            Math.floor(Math.random() * 2),
            cellStates[Math.floor(Math.random() * cellStates.length)]
        );
        //console.log(rowNo, colNo, cellObj);
        return <Cell key={'r' + rowNo + 'c' + colNo}
                     r={rowNo}
                     c={colNo}
                     cellobj={cellObj}
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
  r: PropTypes.string.isRequired
};

export default Row;
