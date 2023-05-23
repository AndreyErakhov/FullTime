/* eslint-disable jsx-a11y/alt-text */
import React from "react";
/* CSS */
import classes from "./ContentCenter.module.css"
/* img */
import AllBoardsPlusWhite from './../../../../../img/AllBoardPlusWhite.svg'

const ContentCenter = (props) => {
    return(
        <div className={classes.content__center}>
            <div className={classes.content__box}>
                <p>Нет досок?</p>
                <p>Создайте свою первую доску сейчас!</p>
                <button className={classes.content__button} onClick={props.active}>
                    <img src={AllBoardsPlusWhite}/><p>Создать доску</p>
                </button>
            </div>
        </div>
    )
}
export default ContentCenter