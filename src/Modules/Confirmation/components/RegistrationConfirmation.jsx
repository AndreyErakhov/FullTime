import React from "react";
import '../confirmation.css'


function RegistrationConfirmation(props){
    return(
        <div>
             <div className="greetings-confirmation">Здравствуйте, {props.name} {props.surname}</div>
                <div className="confirmation-button">{props.children}</div>
                <div className="confirmation-descr">Подтвердите действие: {props.actionName}</div>
        </div>
    )
}

export default RegistrationConfirmation