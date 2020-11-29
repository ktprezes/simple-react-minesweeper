
class Arr2dClass {

    // creates new 2d-array[rows][cols] of 'new elementClass(...elementClassArgs)' elements
    // requires 'rows' and 'cols' to be positive integers
    // 'elementClass' is optional, but when provided, should be a function (e.g. some class name)
    // 'elementClassArgs' are not checked - just passed to the 'elementClass' function
    constructor(rows, cols, elementClass, ...elementClassArgs) {
        // just for debug purposes
        // console.log('Arr2dClass: ', rows, cols, elementClass, elementClassArgs);

        // check if the constructor war properly called
        if (new.target === undefined)
            throw new Error("Arr2dClass constructor: not called using the 'new' operator as it should be.");

        Arr2dClass.checkRowsColsParams(rows, cols);
        Arr2dClass.checkElementClassParam(elementClass);

        this.rows = rows;
        this.cols = cols;

        //initializes 'this.arr' with 2d-array of 'elementClass(...elementClassArgs)'
        this.arr = this.initArr(elementClass, ...elementClassArgs);

    } // constructor(rows, cols, elementClass, ...elementClassArgs) {


    // throws a TypeError when passed args are not numeric integer values
    // throws a RangeError when passed args are not positive integer values
    static checkRowsColsParams(rows, cols, msgBegin = 'Arr2dClass constructor: ') {
        // check the presence of mandatory constructor parameters
        if (!Number.isSafeInteger(rows) || !Number.isSafeInteger(cols))
            throw new TypeError(`${msgBegin}You have to provide 2 positive integer arguments to create new Arr2dClass object.`);

        // we want to create only non-degenerated 2d-arrays
        // ok, '1x1' may not be very impressive one, but is acceptable
        if (rows <= 0 || cols <= 0)
            throw new RangeError(`${msgBegin}You have to provide 2 positive integer arguments to create new Arr2dClass object.`);

        return true;
    } // static checkRowsColsParams(rows, cols, msgBegin) {


    // the 'elementClass', when provided, should be a function - e.g. some class constructor
    // because its purpose is to create new Object - the Arr2dClass element
    // throws a TypeError, when elementClass is defined, but not a function
    static checkElementClassParam(elementClass, msgBegin = 'Arr2dClass constructor: ') {
        if (elementClass && typeof elementClass !== "function")
            throw new TypeError(`${msgBegin}the third argument, when provided, should be the Arr2dClass element class name.`);

        return true;
    } // static checkElementClassParam(elementClass, msgBegin) {


    // preserves 'rows' and 'cols'
    // initializes 'this.arr' with new 2d-array
    // possibly of new 'elementClass' with new 'elementClassArgs'
    // when 'elementClass' is undefined of not a function,
    // fills 'this.elements' 2d-array[rows][cols] with empty objects {}
    initArr(elementClass, ...elementClassArgs) {
        // the 'elementClass', when defined, should be a function
        // if it isn't - throw 'TypeError'
        Arr2dClass.checkElementClassParam(elementClass);

        return new Array(this.rows).fill().map(
            // 'v1' undefined - see 'fill()', but required to access the 'r' arg - index - 'row' number
            (v1, r) => {
                // just for debug purposes
                // console.log('r: ', r);
                return Array(this.cols).fill().map(
                    // 'v2' undefined - see 'fill()', but required to access the 'c' arg - index - 'col' number
                    (v2, c) => {
                        // just for debug purposes
                        // console.log('c: ', c);

                        let elem;

                        // we want the 'arr' elements at different locations 
                        // e.g. [0][2] and [3][1] to be DIFFERENT objects!!! 
                        // even if they will be empty objects
                        // the simple 'return {}' does NOT guarantee that
                        // so we try different approaches
                        if (elementClass) {
                            elem = new elementClass(...elementClassArgs);
                        } else {
                            // it DOES NOT work (returns references to THE SAME object for the whole row)
                            // return {};

                            // but IT WORKS (entering local variable with {} value
                            elem = {};

                            // other approaches which WORK TOO:
                            // elem = Object.create({});
                            // elem = new Object({});
                            // elem = new {};
                        }
                        // just for debug purposes
                        // console.log(`map for arr[${r}][${c}] returns: ${elem}`);

                        return elem;
                    }) // (v2,c) => {
            }); // (v1,r) => {
    } // initArr(elementClass, ...elementClassArgs) {


    isRowInRange(row) {
        if (!Number.isSafeInteger(row)) return false;
        return !(row < 0 || row >= this.rows);
    } // isRowInRange(row) {


    isColInRange(col) {
        if (!Number.isSafeInteger(col)) return false;
        return !(col < 0 || col >= this.cols);
    } // isColInRange(col) {


    isRowColInRange(row, col) {
        return this.isRowInRange(row) && this.isColInRange(col);
    }


    // adds the 'elem' to the end of the array 'arr'
    // IF IT IS NOT ALREADY INCLUDED IN IT
    // (the 'elem' may be anything - the nested array, too)
    // returns new length of the 'arr' array
    // returns 0 (zero) if 'arr' is not array 
    // or if 'arr' or 'elem' are null or undefined
    addIfNotIncluded(arr, elem) {
        if (!arr || !elem) return 0;
        if (!Array.isArray(arr)) return 0;

        let elemJson = JSON.stringify(elem);

        // when the 'elem' is already included in the 'arr' array
        // don't add it again
        if (!JSON.stringify(arr).includes(elemJson)) {
            // let's create the deep copy of 'elem'
            arr.push(JSON.parse(elemJson));
        }

        return arr.length;
    }

    
    // returns the list of indexes of 4 elements adjacent to the one located at [row][col]
    // for adjacency checking the NSWE - north, south, west, east directions are taken into account
    // that list may have from 0 to 4 (both ends included) entries
    // depending on the size of 'this.arr' and the 'wrapIndexes' parameter
    adjacency4IndexesList(row, col, wrapIndexes = false) {
        if (!this.isRowColInRange(row, col)) return [];

        //trivial case - no neighbors
        if (this.rows === 1 && this.cols === 1) return [];

        // just a little trick: 
        // we add the "elem's" indexes to the list as the first entry
        // to avoid adding them later and at the end we'll remove them 
        // to return only the neighbors' indexes
        let indexes = [[row, col]];

        // N (north) neighbor
        if (this.isRowInRange(row - 1)) {
            this.addIfNotIncluded(indexes, [row - 1, col])
        } else if (wrapIndexes) {
            this.addIfNotIncluded(indexes, [this.rows - 1, col])
        }

        // S (south) neighbor
        if (this.isRowInRange(row + 1)) {
            this.addIfNotIncluded(indexes, [row + 1, col])
        } else if (wrapIndexes) {
            this.addIfNotIncluded(indexes, [0, col])
        }

        // W (west) neighbor
        if (this.isColInRange(col - 1)) {
            this.addIfNotIncluded(indexes, [row, col - 1])
        } else if (wrapIndexes) {
            this.addIfNotIncluded(indexes, [row, this.cols - 1])
        }

        // E (east) neighbor
        if (this.isColInRange(col + 1)) {
            this.addIfNotIncluded(indexes, [row, col + 1])
        } else if (wrapIndexes) {
            this.addIfNotIncluded(indexes, [row, 0])
        }

        // remove the checked element's indexes
        // from the list of its neighbors indexes
        indexes.shift();

        return indexes.sort();
    } // adjacency4IndexesList(row, col, wrapIndexes = false) {


    // returns the list of indexes of elements adjacent to the one located at [row][col]
    // for adjacency checking all 8 directions (N NW NE W E SW S SE) are taken into account
    // that list may have from 0 to 8 (both ends included) entries
    // depending on the size of 'this.arr' and the 'wrapIndexes' parameter
    adjacency8IndexesList(row, col, wrapIndexes = false) {
        if (!this.isRowInRange(row) || !this.isColInRange(col)) return [];

        //trivial case - no neighbors
        if (this.rows === 1 && this.cols === 1) return [];

        // we already have the method which adds NSWE indexes :)
        let indexes = this.adjacency4IndexesList(row, col, wrapIndexes);

        // lets repeat the trick from the 'adjacency4IndexesList'
        indexes.unshift([row, col]);

        // TODO: add NW, NE, SW, SE neighbors

        if (this.isRowInRange(row - 1)) {
            if (this.isColInRange(col - 1)) {
                this.addIfNotIncluded(indexes, [row - 1, col - 1]);
            } else if (wrapIndexes) {
                this.addIfNotIncluded(indexes, [row - 1, this.cols - 1]);
            }

            if (this.isColInRange(col + 1)) {
                this.addIfNotIncluded(indexes, [row - 1, col + 1]);
            } else if (wrapIndexes) {
                this.addIfNotIncluded(indexes, [row - 1, 0]);
            }
        } else if (wrapIndexes){
            if (this.isColInRange(col - 1)) {
                this.addIfNotIncluded(indexes, [this.rows - 1, col - 1]);
            } else { // 'wrapIndexes' is 'true' here -> there's no need to check it
                this.addIfNotIncluded(indexes, [this.rows - 1, this.cols - 1]);
            }

            if (this.isColInRange(col + 1)) {
                this.addIfNotIncluded(indexes, [this.rows - 1, col + 1]);
            } else { // 'wrapIndexes' is 'true' here -> there's no need to check it
                this.addIfNotIncluded(indexes, [this.rows - 1, 0]);
            }
        }

        if (this.isRowInRange(row + 1)) {
            if (this.isColInRange(col - 1)) {
                this.addIfNotIncluded(indexes, [row + 1, col - 1]);
            } else if (wrapIndexes) {
                this.addIfNotIncluded(indexes, [row + 1, this.cols - 1]);
            }

            if (this.isColInRange(col + 1)) {
                this.addIfNotIncluded(indexes, [row + 1, col + 1]);
            } else if (wrapIndexes) {
                this.addIfNotIncluded(indexes, [row + 1, 0]);
            }
        } else if (wrapIndexes) {
            if (this.isColInRange(col - 1)) {
                this.addIfNotIncluded(indexes, [0, col - 1]);
            } else { // 'wrapIndexes' is 'true' here -> there's no need to check it
                this.addIfNotIncluded(indexes, [0, this.cols - 1]);
            }

            if (this.isColInRange(col + 1)) {
                this.addIfNotIncluded(indexes, [0, col + 1]);
            } else { // 'wrapIndexes' is 'true' here -> there's no need to check it
                this.addIfNotIncluded(indexes, [0, 0]);
            }
        }

        // remove the checked element's indexes
        // from the list of its neighbors indexes
        indexes.shift();

        return indexes.sort();
    } // adjacency8IndexesList(row, col, wrapIndexes = false) {

} // class Arr2dClass

export default Arr2dClass;
