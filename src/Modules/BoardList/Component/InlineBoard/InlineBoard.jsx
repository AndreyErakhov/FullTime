import React from "react";
import classes from "./InlineBoard.module.css"

const InlineBoard = () => {

    return(
        <div className={classes.inline__board}>
            <h1 className={classes.inline__h1}>Все доски</h1>
            <div className={classes.inline__box}></div>
        </div>
    )
}

export default InlineBoard