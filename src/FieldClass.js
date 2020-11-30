import Arr2dClass from "./Arr2dClass";
import GameConst from "./GameConst";
import CellClass from "./CellClass";

// --------------------------------------------------------
// definition of 'FieldClass' - the 'prototype' of the 'field'
// object which is a 2d-array[rows][cols] of 'CellClass' objects
// and the 'backend' of the 'Field' component - it represents
// the main board of the minesweeper game


class FieldClass extends Arr2dClass {

    constructor(rows, cols, noOfBombs) {
        // check if the constructor war properly called
        if (new.target === undefined)
            throw new Error("FieldClass constructor: not called using the 'new' operator as it should be.");

        FieldClass.checkNoOfBombsParam(noOfBombs);

        // 'super' inits fields: 'rows', 'cols', 'arr'
        // the 'arr' is 2d-array[rows][cols] of 'CellClass' with
        // default values: bomb: false, state: 'closed', 'bombsAround': 0
        super(rows, cols, CellClass, false, 'closed');
        // console.log('FieldClass Constructor before "fill with bombs":')
        // console.log(JSON.stringify(this.arr));

        this.noOfBombs = noOfBombs;

        this.fillWithBombs(noOfBombs);
        this.calculateBombsAroundAllCells();
        // console.log("FieldClass Constructor: 'arr' after 'fill with bombs':");
        // console.log(JSON.stringify(this.arr));
    }; // constructor(rows, cols) {


    static checkNoOfBombsParam(noOfBombs, msgBegin = 'FieldClass constructor: ') {
        if (!Number.isSafeInteger(noOfBombs))
            throw new TypeError(`${msgBegin}'noOfBombs' should be non-negative integer value.`);
        if (noOfBombs < 0)
            throw new RangeError(`${msgBegin}'noOfBombs' should be non-negative integer value.`);

        return true;
    } // static checkNoOfBombsParam(noOfBombs, msgBegin = 'FieldClass constructor: '){


    // the 'rows', 'cols' and 'noOfBombs' values for the field
    // remains the same - they are persistent
    // but the new 'cells' 2d-array of 'CellClass' objects is created
    // with default values: hasBomb: false, cellState: 'closed'
    // and filled with initial count of 'noOfBombs' in random places,
    // and the 'bombsAround' value for every cell is calculated
    resetField() {
        this.arr = this.initArr(CellClass, false, 'closed');

        this.fillWithBombs(this.noOfBombs);
        this.calculateBombsAroundAllCells();
    } // resetField() {


    // count number of 'cells' in the 'field' array
    // with 'bomb' set to 'true'
    countBombs() {
        if (!this.arr) return 0;

        let count = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.arr[i][j].bomb === true) {
                    count++;
                }
            } // for (let j...)
        } // for (let i...)

        return count;
    }; // const countBombs () {


    // place randomly 'noOfBombs' somewhere on the 'field'
    fillWithBombs(noOfBombs) {
        if (!this.arr || !Number.isSafeInteger(noOfBombs)) return false;
        if (noOfBombs < 1 || noOfBombs > this.rows * this.cols) return false;

        // 'while' loop instead of 'for' to maintain cases,
        // when 'random' hits the same cell multiple times
        while (this.countBombs() < noOfBombs) {
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.cols);
            this.arr[r][c].bomb = true;
        }
        return true;
    }; // fillWithBombs (noOfBombs) {


    // for the cell[row][col] count the number
    // of 'bombs' in the neighborhood
    countBombsAround(row, col) {
        if (!this.arr) return 0;
        if (!this.isRowColInRange(row, col)) return 0;

        let cellsAroundIndexes = this.adjacency8IndexesList(row, col, false);
        if (!cellsAroundIndexes || cellsAroundIndexes.length === 0) return 0;

        // the 'cellsAroundIndexes' (if its not empty) entries are 2-element sub-arrays: [r,c]
        // with indexes of cells adjacent to that one located at [row][col]
        // therefore we can destructure that sub-arrays
        // the 'length' of filtered 'cellsAroundIndexes' array
        // should be equal (and it is, I hope) to number of bombs in the near of arr[row][col]
        return cellsAroundIndexes.filter((idx) => {
            const [r, c] = idx;
            return this.arr[r][c].bomb; // 'bomb' is already of 'boolean' type
        }).length;
    } // countBombsAround(row, col) {


    // update 'bombsAround' property for all cells in the field
    calculateBombsAroundAllCells() {
        if (!this.arr) return;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.arr[r][c].bombsAround = this.countBombsAround(r, c);
            } // for (let c...)
        } // for (let r...)
    } //calculateBombsAroundAllCells() {


    isWinConditionSatisfied() {
        if (!this.arr) return false;

        let markedCellsWithBombsCounter = 0;

        this.arr.forEach((row) => {
            row.forEach((cell) => {
                if (cell && cell.bomb && cell.state === 'marked') {
                    markedCellsWithBombsCounter++;
                }
            })
        });

        return markedCellsWithBombsCounter === GameConst.noOfBombs;
    } // isWinConditionSatisfied() {


    // sets the state of all cells (besides these properly-marked) to 'open'
    // method used after finishing the game to show the whole field
    // (properly marked cells with bombs remain marked - to show proper icon)
    revealRemainingCells() {
        if (!this.arr) return false;

        this.arr.forEach((row) => {
            row.forEach((cell) => {
                if (cell && !(cell.bomb && cell.state === 'marked')) {
                    cell.state = 'open';
                }
            })
        });
    } // revealRemainingCells() {


    // sets to 'open' the state off all adjacent cells with 'bombsAround' == 0,
    // and their neighbors, starting from the given cell
    // returns the number of all opened cells
    revealAdjacentEmptyCells(row, col) {
        if (!this.arr) return 0;
        if (!this.isRowColInRange(row, col)) return 0;
        if (!this.arr[row][col] || !this.arr[row][col].bombsAround === 0) return 0;

        // treat the indexes of the given cell as a seed
        let cellsToOpenIdx = [[row, col]];

        // as the first step make a list of indexes
        // of all adjacent cells with 0 bombs in the near
        // take into account the 4-directions (NSWE) adjacency
        // without 'index wrapping'
        // we use 'do.. while()', and not the 'map/forEach' methods
        // because we modify the original array 'cellsToOpenIdx'
        // and this may lead to tricky errors with 'map/forEach'
        let i = 0;
        do {
            let [r, c] = cellsToOpenIdx[i];
            this.adjacency4IndexesList(r, c,false ).forEach((currNeighborIdx) => {
                let [r1, c1] = currNeighborIdx;
                // check if the neighbor has 0 bombs in the near, too
                if (this.arr[r1][c1].bombsAround === 0) {
                    this.addIfNotIncluded(cellsToOpenIdx, currNeighborIdx);
                }
            })
        } while (++i < cellsToOpenIdx.length);

        // right now we have to have the list of indexes
        // of all adjacent cells with 0 bombs in the near
        // let's try to open that cells
        cellsToOpenIdx.forEach((cellIdx) => {
            let [r, c] = cellIdx;
            this.arr[r][c].state = 'open';
        })

        // we open the neighbors of that empty, 0-bomb surrounded cells, too
        // this time we consider  the 8-directions adjacency
        let neighborsIdx = [];
        cellsToOpenIdx.forEach((cellIdx) => {
            let [r, c] = cellIdx;
            this.adjacency8IndexesList(r,c,false).forEach((neighbor) => {
                let [r1,c1] = neighbor;
                if (this.arr[r1][c1].state !== 'open'){
                    neighborsIdx.push(neighbor);
                    this.arr[r1][c1].state = 'open';
                }
            })
        })

        return cellsToOpenIdx.length + neighborsIdx.length;
    } // revealAdjacentEmptyCells(row, col) {


} // class FieldClass {


export default FieldClass;

