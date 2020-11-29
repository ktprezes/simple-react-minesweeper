import Arr2dClass from "./Arr2dClass";
import GameConst from "./GameConst";
import CellClass, {cellStates} from "./CellClass";

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


    // count number of cells in the field with given 'state'
    // possible state values: cellStates = ['closed', 'open', 'marked'];
    countCellsWithState(state) {
        if (!this.arr) return 0;
        if (!state || !cellStates.includes(state)) return 0;

        let count = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.arr[r][c].state === state) {
                    count++;
                }
            } // for (let j...)
        } // for (let i...)

        return count;
    } // countCellsWithState(state){

} // class FieldClass {


export default FieldClass;

