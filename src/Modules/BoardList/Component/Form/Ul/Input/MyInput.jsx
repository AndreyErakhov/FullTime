import React from "react";
import classes from './MyInput.module.css'

const MyInput = (props) => {
    
    return(
        <>
        <input 
        type="text"
        {...props} 
        className={classes.modal__input}
        placeholder="Введите название доски"
        />
        <div className={classes.modal__boardеу}></div>
        </>
    )
}
export default MyInput