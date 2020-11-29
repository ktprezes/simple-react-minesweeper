
// --------------------------------------------------------
// definition of 'CellClass' - the 'prototype' of objects
// in the 'field' array and the 'backend' of 'Cell' components

export const cellStates = ['closed', 'open', 'marked'];

class CellClass {
    constructor(hasBomb = false, cellState = 'closed') {
        // just for debug purposes
        // console.log('CellClass: ', hasBomb, cellState);
        this.bomb = !!hasBomb;
        this.state = cellStates.includes(cellState) ? cellState : 'closed';
        this.bombsAround = 0; // it will be set after creating the whole board
    } // class CellClass constructor
} // class CellClass {

export default CellClass;
