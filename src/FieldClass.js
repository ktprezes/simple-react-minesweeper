import CellClass, {cellStates} from "./CellClass";

// --------------------------------------------------------
// definition of 'FieldClass' - the 'prototype' of the 'field'
// object which is a 2d-array[rows][cols] of 'CellClass' objects
// and the 'backend' of the 'Field' component - it represents
// the main board of the minesweeper game

class FieldClass {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        // create the 2d-array[rows][cols] of CellClass objects
        // with default values - without 'bomb' and with 'closed' state
        // it must NOT be done that way:
        //      Array(rows).fill(Array(cols).fill(new CellClass()));
        // because in that case all rows would be filled
        // with the reference to _the_same_ row of cells
        // therefore it must be done as below:
        this.cells = new Array(rows).fill(null).map(
            () => Array(cols).fill(null).map(() => new CellClass(false, 'closed'))
        );
    }; // constructor(rows, cols) {


    // count number of 'cells' in the 'field' array
    // with 'bomb' set to 'true'
    countBombs() {
        if (!this.cells) return 0;

//        let arr = this.cells;
        let count = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.cells[i][j].bomb === true) {
                    count++;
                }
            } // for (let j...)
        } // for (let i...)

        return count;
    }; // const countBombs () {


    // place randomly 'noOfBombs' somewhere on the 'field'
    fillWithBombs (noOfBombs) {
        if (!this.cells || !noOfBombs) return false;
        if (typeof noOfBombs !== 'number') return false;
        if (noOfBombs !== Math.floor(noOfBombs)) return false;
        if (noOfBombs < 1 || noOfBombs > this.rows * this.cols) return false;

        // 'while' loop instead of 'for' to maintain cases,
        // when 'random' hits the same cell multiple times
        while (this.countBombs() < noOfBombs) {
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.cols);
            this.cells[r][c].bomb = true;
        };
        return true;
    }; // fillWithBombs (noOfBombs) {


    // for the cell[row][col] count the number
    // of 'bombs' in the neighborhood
    countBombsAround(row, col) {
        if (!this.cells) return 0;
        if (typeof row !== 'number' || typeof col !== 'number') return 0;
        if (row !== Math.floor(row) || col !== Math.floor(col)) return 0;
        if (row < 0 || row >= this.rows) return 0;
        if (col < 0 || col >= this.cols) return 0;

        let count = 0;

        // don't take into account indices outside of 'cells' array boundaries
        for (let r = (row - 1 < 0 ? 0 : row - 1); r <= (row + 1 >= this.rows ? this.rows - 1 : row + 1); r++) {
            for (let c = (col - 1 < 0 ? 0 : col - 1); c <= (col + 1 >= this.cols ? this.cols - 1 : col + 1); c++) {
                // don't take into account the cell we count the neighborhood for
                if (r === row && c === col) {
                    continue;
                }
                if (this.cells[r][c].bomb) {
                    count++;
                }
            } // for (let c = ...)
        } // for (let r = ...)

        return count;
    } // countBombsAround(row, col) {


    // update 'bombsAround' property for all cells in the field
    calculateBombsAroundAllCells() {
        if (!this.cells) return;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.cells[r][c].bombsAround = this.countBombsAround(r, c);
            } // for (let c...)
        } // for (let r...)
    } //calculateBombsAroundAllCells() {


    // count number of cells in the field with given 'state'
    // possible state values: cellStates = ['closed', 'open', 'marked'];
    countCellsWithState(state){
        if (!this.cells) return 0;
        if (!state || !cellStates.includes(state)) return 0;

        let count = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.cells[r][c].state === state) {
                    count++;
                }
            } // for (let j...)
        } // for (let i...)

        return count;
    } // countCellsWithState(state){

} // class FieldClass {


export function createFieldWithBombs(rows, cols, noOfBombs) {
    let field = new FieldClass(rows, cols);
    if (field) {
        field.fillWithBombs(noOfBombs);
        field.calculateBombsAroundAllCells();
    }
    return field
}

export default FieldClass;

