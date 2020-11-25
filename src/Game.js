import React, {useState} from "react";
import GameConst from "./GameConst";
import ControlPanel from './ControlPanel';
import Field from "./Field";
import {createFieldWithBombs} from "./FieldClass";

import LogoArea from "./LogoArea";
import './styles/Game.css';

const myField = createFieldWithBombs(
    GameConst.rows, GameConst.cols, GameConst.noOfBombs
);
const Game = () => {

    // const [cellArr, setCellArr] = useState([...myField.cells]);

    // to properly handle the 'state', we need the deep copy of 'myField.cells'
    // (the deeper one then the spread/'...' operator provides)
    const [cellArr, setCellArr] = useState(JSON.parse(JSON.stringify(myField.cells)));

    const handleCellClicks = (e) => {
        console.log(e.target);
        console.log(e.target.dataset);
        let row = Number(e.target.dataset.r);
        let col = Number(e.target.dataset.c);

        // handle 'left mouse button' - 'onClick' event
        if (e.which === 1 || e.button === 0) {
            // console.log('Left mouse button at ' + e.clientX + 'x' + e.clientY);
            if (cellArr[row][col].state !== 'open') {
                console.log('[',row,',',col,']: !open -> open');
                myField.cells[row][col].state = 'open';
                // setCellArr([...myField.cells]);
                setCellArr(JSON.parse(JSON.stringify(myField.cells)));
            }
        } // end of handle 'left mouse button'

        // handle 'right mouse button' - 'onContextMenu' event
        if (e.which === 3 || e.button === 2) {
            // console.log('Right mouse button at ' + e.clientX + 'x' + e.clientY);
            if (cellArr[row][col].state === 'closed') {
                console.log('[',row,',',col,']: closed -> marked');
                myField.cells[row][col].state = 'marked';
                // setCellArr([...myField.cells]);
                setCellArr(JSON.parse(JSON.stringify(myField.cells)));
            } else if (cellArr[row][col].state === 'marked') {
                console.log('[',row,',',col,']: marked -> closed');
                myField.cells[row][col].state = 'closed';
                // setCellArr([...myField.cells]);
                setCellArr(JSON.parse(JSON.stringify(myField.cells)));
            }
        } // end of handle 'right mouse button'
    } // const handleCellClicks = (e) => {


    return (
        <div className="minesweepergame"
             onContextMenu={(e) => e.preventDefault()}
        >
            <ControlPanel marked={myField.countCellsWithState('marked')}/>
            <Field cellArr={cellArr} myCellClickHandler={handleCellClicks}/>
            <LogoArea/>
        </div>
    ); // return() of function Game()
}; // Game()

export default Game;
