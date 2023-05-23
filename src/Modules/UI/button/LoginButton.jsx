import React from "react";
import classes from "./LoginButton.module.css"
function LoginButton({children, ...props}){
    return(
        <button {...props} className={classes.loginButton}>
            {children}
        </button>
    )
}

export default LoginButton