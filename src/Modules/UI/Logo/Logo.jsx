import React from "react";
import logoBig from './Logo.svg'
// import classes from './logo.module.css'

function Logo(){
    return(
        <div className='logo'>
               <img  src={logoBig} alt='#'/>
        </div>
    )
}

export default Logo