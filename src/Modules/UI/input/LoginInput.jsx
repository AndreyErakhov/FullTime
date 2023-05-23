import React from "react";
import classes from './LoginInput.module.css'


function MyInput(props){
    return(
        <input className={classes.loginInput} {...props}/>
    )
}

export default MyInput