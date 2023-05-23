import React from "react";
import './modal.css'
function Modal(props){
    return(
        <div className={props.modal} onClick={props.setModal}>
            <div className="modal__content" onClick = { e => e.stopPropagation()}>
                {props.children}
                       </div>
        </div>
    )
    
}

export default Modal