/* eslint-disable jsx-a11y/alt-text */
import React from "react";
/* IMPORT IMG */
import AllBoardsPlus from "./../../../../img/AllBoardsPlus.svg"
/* CSS */
import classes from './ButtonBoard.module.css'

const ButtonBoard = (props) => {
    
    return(
        <div className={classes.button__board}>
            <button className={classes.create__button} onClick={props.active}>
                <img src={AllBoardsPlus}/>
                <p>Создать доску</p>
            </button>
        </div>
    )
}

export default ButtonBoard