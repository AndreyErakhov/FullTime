import React, { useState } from "react";
import Blob from "../UI/blob/Blob";
import Logo from "../UI/Logo/Logo";
import './ForgottenPassword.css'
import {  NavLink } from "react-router-dom";
import globalService from "../../API/PostService";
import Modal from '../UI/modal/Modal'
import LoginButton from "../UI/button/LoginButton";
import ButtonArrow from "../UI/buttonArrow/ButtonArrow";
import LoginInput from '../UI/input/LoginInput'
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading";


function ForgottenPassword(){
    const [requestLoading, setRequestLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailData, setEmailData] = useState({email: ''})

const forgottenPassword = async (emailData)=> {
    setRequestLoading(true)
    const forgottenPasswordRequest = await globalService('forgottenPasswordRequest', emailData)
    if(forgottenPasswordRequest[0] === 'complete'){
    setModal(true)
      //console.log(verifyRequest[1])
    } else {
        setModalError(true)
        setErrorMessage(forgottenPasswordRequest)
    }
    setRequestLoading(false)
} 
function forgottenPasswordButton(){
    forgottenPassword(emailData)
}
    return(
        <section className="forgottenPass-content">
            <Logo/>
            <Blob/>
            <ButtonArrow/>
            <h1> Восстановление пароля</h1>
                <div className="forgottenPass-email">
                    <div className='forgottenPass-text'>Email</div>
                    <LoginInput
                        onChange={e =>setEmailData({...emailData, email:(e.target.value)})}
                        value={emailData.email}
                        type='text' 
                        placeholder="Введите свою почту">
                    </LoginInput>
            </div> 
            {
              requestLoading
              ?<ButtonLoading/>
              : <LoginButton onClick ={forgottenPasswordButton} disabled ={emailData.email.length  === 0 ?"disabled": ''} >Подтвердить</LoginButton>
            }

            <div className='forgottenPass-descr'>
                Введите почту для восстановления доступа. Вам отправят ссылку для сброса пароля  
           </div>

                <Modal modal={modal ? "modal active" : "modal"}
                setModal={setModal}
                >
                     <h4 className="modal-h">УСПЕХ</h4>
                    <p className="modal-descr">Письмо для смены пароля отправлено на указанную почту</p>
                    <LoginButton><NavLink to='/'>Продолжить</NavLink></LoginButton>
                </Modal>
               
               <Modal modal={modalError ? "modal active" : "modal"}
                setModal={setModalError}
               >
                     <h4 className="modal-h">Error</h4>
                    <p className="modal-descr">{errorMessage}</p>
                    <LoginButton><NavLink to='/'>Продолжить</NavLink></LoginButton>
               </Modal>
        </section>
    )
}

export default ForgottenPassword