import React from "react";
import PropTypes from 'prop-types';
import CellClass from "./CellClass";
import bomb from "./images/bomb1.svg";
import boom from "./images/boom1.svg";
import './styles/Cell.css';


// --------------------------------------------------------
// definition of 'Cell' react component
// visual representation of 'CellClass' objects

export const Cell = (props) => {

    const rowNo = Number(props.r);
    const colNo = Number(props.c);
    const cell  = props.cellObj;
    const myCellClickHandler = props.myCellClickHandler;
    let cellContent = '';
    let auxCellClass = '';

    // non-empty Cell components (with bombImg/boomImg or bombsCount inside), when clicked,
    // pass to the event handler as 'e.target' the child element (<img..> / <p>)
    // NOT their own element value ( the <div className={cellClass}.. />)
    // therefore the child elements need the dataset values ('data-r' and 'data-c') too,
    // for the event handler to work properly
    const bombImg = <img src={bomb} className="bomb-img" alt="bomb" data-r={rowNo} data-c={colNo} />;
    const boomImg = <img src={boom} className="boom-img" alt="boom" data-r={rowNo} data-c={colNo} />;
    const bombsCount = <p data-r={rowNo} data-c={colNo} >{cell.bombsAround.toString()}</p>;
    // console.log(rowNo, colNo, cell, typeof cell.bomb, typeof cell.state);

    if (cell.state === 'marked') {
        cellContent = bombImg;
        auxCellClass = 'marked';
    } else if (cell.state === 'open' && cell.bomb) {
        cellContent = boomImg;
        auxCellClass = 'open boom';
    } else if (cell.state === 'open' && !cell.bomb) {
        cellContent = cell.bombsAround === 0 ? '' : bombsCount;
        auxCellClass = 'open empty';
    } else { // default 'closed' state is here, too...
        cellContent = '';
        auxCellClass = 'closed';
    }
    let cellClass = 'cell ' + auxCellClass;

    // console.log(cellClass);

    // the 'data-xxx' attributes are available withing event handler function as 'dataset keys',
    //  e.g.: 'data-r' can be accessed within the event handler function
    // as e.target.dataset.r
    return (
        <div className={cellClass}
             data-r={rowNo}
             data-c={colNo}
             onClick={myCellClickHandler}
             onContextMenu={myCellClickHandler}
        >
            {cellContent}
        </div>
    ); // return() of Cell() function
} // function Cell()

Cell.propTypes = {
    r: PropTypes.string.isRequired,
    c: PropTypes.string.isRequired,
    cellObj: PropTypes.instanceOf(CellClass).isRequired,
    myCellClickHandler: PropTypes.func.isRequired
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
