import React, { useState } from "react";
import Blob from "../UI/blob/Blob";
import Logo from "../UI/Logo/Logo";
import RegistrationConfirmation from "./components/RegistrationConfirmation";
import './confirmation.css'
import queryString from "query-string";
import {  NavLink, useLocation } from "react-router-dom";
import globalService from "../../API/PostService";
import Modal from '../UI/modal/Modal'
import LoginButton from "../UI/button/LoginButton";
import ChangePasswordConfirmation from "./components/ChangePasswordConfirmation";
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading'
import BadRequest from "../UI/BadRequest/BadRequest";

function Confirmation(){
    const [requestLoading, setRequestLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [changedComponent,setChangedComponent] = useState(false)
    const [newPassword, setNewPassword] = useState({newPassword:''})
    const [passwordConfirm, setPasswordConfirm] = useState('')


let location = useLocation()
const query = queryString.parse(location.search)
const verifyData = {verifyToken:query.token}
const changePasswordData = { ...verifyData, ...newPassword}

    console.log(changePasswordData)

const verifyUser = async (verifyData)=> {
    setRequestLoading(true)
    const verifyRequest = await globalService('verifyUser', verifyData)
    //console.log(verifyRequest)
    if(verifyRequest[0] === 'complete'){
    setModal(true)
      //console.log(verifyRequest[1])
    } else {
        setModalError(true)
        setErrorMessage(verifyRequest)
    }
    setRequestLoading(false)
} 
const changePassword = async (newPassword)=> {
    setRequestLoading(true)
    const changePasswordRequest = await globalService('changePasswordRequest', changePasswordData)
    if(changePasswordRequest[0] === 'complete'){
    setModal(true)
      //console.log(verifyRequest[1])
    } else {
        setModalError(true)
        setErrorMessage(changePasswordRequest)
    }
    setRequestLoading(false)
} 
const successDescr = ()=>{
    if(query.type === 'REGISTRATION'){
        return 'Почта успешно подтверждена!'
    } else if(query.type === 'PASSWORD_RESET'){
        return 'Пароль успешно изменён!'
    }
}  
let text = successDescr() 
function renderComponent(){
    console.log(changedComponent)
        setChangedComponent(true)
    console.log(newPassword)
}

function verifyUserButton(e){
    verifyUser(verifyData)
}
function changePasswordButton(){
    changePassword(newPassword)
}
console.log(newPassword)
    return(
        !query.type? <BadRequest/> :
    
    <div className="bodytest">
            <Modal modal={modal ? "modal active" : "modal"}
                setModal={setModal}
                >
                     <h4 className="modal-h">УСПЕХ</h4>
                    <p className="modal-descr">{text}</p>
                    <LoginButton><NavLink to='/'>Продолжить</NavLink></LoginButton>
                </Modal>
                <Modal modal={modalError ? "modal active" : "modal"}
                setModal={setModalError}
               >
                     <h4 className="modal-h">Error</h4>
                    <p className="modal-descr">{errorMessage}</p>
                    <LoginButton><NavLink to='/'>Продолжить</NavLink></LoginButton>
               </Modal>

        <div className="confirmation-content">
                 <Blob/>
                 <Logo/>
               
                
               {query.type === 'REGISTRATION'? 
                 <RegistrationConfirmation
                 name ={query.name} 
                 surname = {query.surname}
                 actionName = 'Смена почты'
                 >
            <LoginButton onClick = {verifyUserButton}>Подтвердить</LoginButton>

                 </RegistrationConfirmation> 
               :changedComponent?
            <ChangePasswordConfirmation
                name ={query.name} 
                surname = {query.surname}
                dataOnChange={e =>setNewPassword({...newPassword, newPassword:(e.target.value)})}
                dataValue={newPassword.newPassword}
                confirmOnChange={e =>setPasswordConfirm((e.target.value))}
                confirmValue={passwordConfirm}
            >
               <div className='contents-btn'>{
              requestLoading
              ?<ButtonLoading/>
              : <LoginButton 
                    disabled={newPassword.newPassword.length === 0 ||
                         newPassword.newPassword !== passwordConfirm? 'disabled': ''}
                    onClick={changePasswordButton}
                    >
                        Изменить пароль
                    </LoginButton>
                } </div>
            </ChangePasswordConfirmation>
             :query.type === 'PASSWORD_RESET'? 
               <RegistrationConfirmation
                name ={query.name} 
               surname = {query.surname}
               actionName = 'Изменение пароля'
               >
                <LoginButton onClick={renderComponent}>Подтвердить</LoginButton>
               </RegistrationConfirmation> 
            :''}
        </div>
        </div>
            )
}

export default Confirmation