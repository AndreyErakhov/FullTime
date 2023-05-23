import React from "react";
import arrow from './Arrow.svg'
import classes from './buttonArrow.module.css'
import {Link} from 'react-router-dom'
function ButtonArrow(){
    return(
        <Link to='/' className={classes.arrowButton}>
               <img src={arrow} alt="" />
        </Link>
    )
}

export default ButtonArrow
