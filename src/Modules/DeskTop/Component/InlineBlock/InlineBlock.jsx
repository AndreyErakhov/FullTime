import React from "react";
import classes from "./InlineBlock.module.css"

const InlineBlock = () => {

    return(
        <div className={classes.inline__board}>
            <h1 className={classes.inline__h1}>Доска первая</h1>
            <div className={classes.inline__box}></div>
        </div>
    )
}

export default InlineBlock