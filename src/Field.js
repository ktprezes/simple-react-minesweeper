import React from "react";
import GameConst from "./GameConst";
import Row from './Row';
import './styles/Field.css';

function Field() {
    const rowNumbers = [...Array(GameConst.rows).keys()];

    const rows = rowNumbers.map((no) => {
        let rowNo = no.toString();
        return <Row key={'r'+rowNo} r={rowNo} />
    });


    return (
        <main className="Field">
            {rows}
        </main>
    ); /*return() of function Field()*/
}/* function Field()*/

export default Field;

