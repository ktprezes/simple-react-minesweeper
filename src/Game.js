import React, {useState, useEffect} from "react";
import GameConst from "./GameConst";
import ControlPanel from './ControlPanel';
import Field from "./Field";
import FieldClass from "./FieldClass";
import LogoArea from "./LogoArea";
import './styles/Game.css';


const myField = new FieldClass(GameConst.rows, GameConst.cols, GameConst.noOfBombs);
let intervalID = null;

const Game = () => {

    const [gameState, setGameState] = useState('init');

    const [markedCellsCount, setMarkedCellsCount] = useState(0);
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    let myFieldArrStringify = JSON.stringify(myField.arr);

    // to properly handle the 'state', we need the deep copy of 'myField.arr'
    // (the deeper one then the spread/'...' operator provides)
    const [cellArr, setCellArr] = useState(JSON.parse(myFieldArrStringify));
    // const [cellArr, setCellArr] = useState();
    console.log('Game begin');
    console.log(myFieldArrStringify);


    useEffect(() => {
        if (gameState === 'init') {
            // the 'init' state is at the very beginning and after 'resetBtn' click
            // create new field of cells with bombs
            myField.resetField();
            setMarkedCellsCount(0);
            setSecondsElapsed(0);
            setCellArr(JSON.parse(JSON.stringify(myField.arr)));
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
        } else if (gameState === 'action') {
            intervalID = setInterval(updateSecondsElapsed, 1000);
        } else if (gameState === 'defeat') {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
        } else if (gameState === 'victory') {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
        }

        return () => {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
        }
    }, [gameState]);    // useEffect(() => {


    const updateSecondsElapsed = () => {
        setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1)
    };

    const handleCellClicks = (e) => {
        // console.log(e.target);
        // console.log(e.target.dataset);
        let row = Number(e.target.dataset.r);
        let col = Number(e.target.dataset.c);
        let cellArrStateShouldUpdate = false;

        console.log(JSON.stringify(myField.arr[row][col]));

        if (gameState === 'init' || gameState === 'action') {
            if (gameState === 'init') {
                setGameState('action');
            }
            // handle 'left mouse button' - 'onClick' event
            if (e.which === 1 || e.button === 0) {
                // console.log('Left mouse button at ' + e.clientX + 'x' + e.clientY);
                if (cellArr[row][col].state !== 'open') {
                    console.log('[',row,',',col,']: !open -> open');
                    myField.arr[row][col].state = 'open';
                    cellArrStateShouldUpdate = true;
                }

                // oopppssss.. you've left-clicked
                // non-open cell with bomb :(
                if (cellArr[row][col].bomb) {
                    setGameState('defeat');
                }
            } // end of handle 'left mouse button'

            // handle 'right mouse button' - 'onContextMenu' event
            if (e.which === 3 || e.button === 2) {
                // console.log('Right mouse button at ' + e.clientX + 'x' + e.clientY);
                if (cellArr[row][col].state === 'closed') {
                    console.log('[',row,',',col,']: closed -> marked');
                    myField.arr[row][col].state = 'marked';
                    setMarkedCellsCount(markedCellsCount + 1);
                    cellArrStateShouldUpdate = true;
                } else if (cellArr[row][col].state === 'marked') {
                    console.log('[',row,',',col,']: marked -> closed');
                    myField.arr[row][col].state = 'closed';
                    setMarkedCellsCount(markedCellsCount - 1);
                    cellArrStateShouldUpdate = true;
                }
            } // end of handle 'right mouse button'
        } // if (gameState === 'init' || gameState === 'action') {
        if (cellArrStateShouldUpdate) setCellArr(JSON.parse(JSON.stringify(myField.arr)));
    } // const handleCellClicks = (e) => {


    const handleResetBtnClick = (e) => {
        // handle 'left mouse button' - 'onClick' event
        if (e.which === 1 || e.button === 0) {
            setGameState('init');
        }
    } // const handleResetBtnClick = (e) => {

    return (
        <div className="minesweepergame"
             onContextMenu={(e) => e.preventDefault()}
        >
            <ControlPanel
                marked={markedCellsCount}
                timeElapsed={secondsElapsed}
                myResetBtnClickHandler={handleResetBtnClick}
            />
            <Field
                cellArr={cellArr}
                gameState={gameState}
                myCellClickHandler={handleCellClicks}
            />
            <LogoArea/>
        </div>
    ); // return() of function Game()
}; // Game()

export default Game;
