import React from "react";
import Blob from "../UI/blob/Blob";
import Logo from "../UI/Logo/Logo";
import RegistrationForm from "./components/RegistratonForm";
import './registration.css'
import ButtonArrow from "../UI/buttonArrow/ButtonArrow";
import { ReactNotifications } from "react-notifications-component";

function Registration(){
    return(
        <div>
            <div style={{top:0, position:'fixed'}}>
                <ReactNotifications/>
            </div>
            <div className="registration-content">
                
                <Logo/>
                <Blob/>
                <ButtonArrow/>
                <h1>Регистрация</h1>
                <RegistrationForm/>
                <div className='reg-rules'>
                    Нажимая вы соглашаетесь с политикой конфиденциальности
                </div>
            </div>
        </div>
    )
}

export default Registration