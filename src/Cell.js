import React from "react";
import CellClass from "./CellClass";
import PropTypes from 'prop-types';
//import GameConst from "./GameConst";

// --------------------------------------------------------
// definition of 'Cell' react component
// visual representation of 'CellClass' objects

import './styles/Cell.css';

import bomb from "./images/bomb1.svg";
const bombImg = <img src={bomb} className="bomb-img" alt="bomb" />;

import boom from "./images/boom1.svg";
const boomImg = <img src={boom} className="boom-img" alt="boom" />;

export const Cell = (props) => {

    const rowNo = props.r;
    const colNo = props.c;
    const cell  = props.cellobj;
    let cellContent = '';
    let auxCellClass = '';

    console.log(rowNo, colNo, cell, typeof cell.bomb, typeof cell.state);

    if (cell.state === 'marked') {
        cellContent = bombImg;
        auxCellClass = 'marked';
    } else if (cell.state === 'open' && cell.bomb) {
        cellContent = boomImg;
        auxCellClass = 'open boom';
    } else if (cell.state === 'open' && !cell.bomb) {
        cellContent = '';
        auxCellClass = 'open empty';
    } else { // default 'closed' state is here, too...
        cellContent = '';
        auxCellClass = 'closed';
    }
    let cellClass = 'cell ' + auxCellClass;
    console.log(cellClass);

    return (
        <div className={cellClass}
             r={rowNo}
             c={colNo}
        >
            {cellContent}
        </div>
    ); // return() of Cell() function
} // function Cell()

Cell.propTypes = {
    r: PropTypes.string.isRequired,
    c: PropTypes.string.isRequired,
    cellobj: PropTypes.instanceOf(CellClass).isRequired
};

export default Cell;


/*
cell - possible states:

(initial state)
   'closed'  <-- Right Click -->  'marked'
 class: closed                  class: marked
       \                          /
        \                        /
   (left click)           (left click)
          \                   /
           V                 V
              has bomb  ???
             /           \
           YES           NO
          /               \
         V                V
  'open' + bomb       'open' without bomb
class: 'open boom'    class: 'open empty'
 */
