import React from "react";
import PropTypes from "prop-types";
import './styles/ResetBtn.css';

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
