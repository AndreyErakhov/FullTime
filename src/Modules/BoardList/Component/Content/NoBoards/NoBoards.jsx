import React from "react";
/* CSS */
import classes from "./NoBoards.module.css"
/* img */
import smile from './img/Group 78.svg'


const NoBoards = () => {
    const text = 'Ничего не найдено :('
    return(
        <div className={classes.content__center}>
            <div className={classes.content__box}>
                <img src={smile} alt="" />
                <p>{text}</p>
            </div>
        </div>
    )
}
export default NoBoards