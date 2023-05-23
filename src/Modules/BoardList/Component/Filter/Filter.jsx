/* eslint-disable jsx-a11y/alt-text */
import React from "react";
/* Filter img */
import Search from './../../../../img/search.svg'
import HeaderExit from './../../../../img/HeaderExit.svg'
/* CSS */
import classes from './Filter.module.css'


const Filter = (props) => {
    
    return(
        <div className={classes.filter}>
            <div className={classes.filter__nav}>
                <div className={classes.filter__content}>
                    <div className={classes.filter__img}>
                        <img src={Search}/>
                    </div>
                    {props.children}
                    <button onClick={props.delete} className={classes.filter__btn}>
                        <img src={HeaderExit}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter