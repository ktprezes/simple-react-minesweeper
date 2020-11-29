import React from "react";
import './styles/ResetBtn.css';
import PropTypes from "prop-types";

function ResetBtn(props) {
    return (
        <button
            type="button"
            className="resetBtn"
            onClick={props.myResetBtnClickHandler}
        >New</button>
    ); /*return() of function ResetBtn()*/
}/* function ResetBtn()*/


ResetBtn.propTypes = {
    myResetBtnClickHandler: PropTypes.func.isRequired
}


export default ResetBtn;
