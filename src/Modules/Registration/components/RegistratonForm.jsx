import React, { useState } from "react";
import LoginInput from '../../UI/input/LoginInput'
import LoginButton from "../../UI/button/LoginButton";
import globalService from '../../../API/PostService'
import buttonPass from './../../../img/buttonPass.svg'
import eyeClose from './../../../img/eyeClose.svg'
import ButtonLoading from "../../UI/ButtonLoading/ButtonLoading";
import { Store } from "react-notifications-component";

function RegistrationForm(){

    const [registrationData, setRegistrationData] = useState(
        {
            email:'',
            name:'',
            surname:'',
            password:''
        })
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)
    const [requestLoading, setRequestLoading] = useState(false)

    const createNewUserPost = async (registrationData) => {
        setRequestLoading(true)
        const createUserRequest = await globalService('createUser', registrationData)
        if(createUserRequest[0] === 'complete'){

          Store.addNotification({
            title: "Успех!",
            message: createUserRequest[1],
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
      
        }
        if(createUserRequest[0] === 'error'){
          //уведомление
          Store.addNotification({
              title: "Ошибка!",
              message: createUserRequest[1],
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: true
              }
            });
      }
        setRequestLoading(false)
      }

    function createNewUser(e){
        e.preventDefault()
        createNewUserPost(registrationData)
    }
   
    const ChangeEye = (e) => {
        e.preventDefault()
        hidePassword? setHidePassword(false):setHidePassword(true)
      }
      const tooglePass = () => {
        if(hidePassword ){
          return (<button className='eye' onClick={ChangeEye} ><img src={buttonPass} alt="buttonPass" /></button>)
        }else{
          return (<button className='eye__close' onClick={ChangeEye} ><img src={eyeClose} alt="eyeClose" /></button>)
        }
      }
      const ChangeEye2 = (e) => {
        e.preventDefault()
        hidePassword2? setHidePassword2(false):setHidePassword2(true)
      }
      const tooglePass2 = () => {
        if(hidePassword2){
          return (<button className='eye' onClick={ChangeEye2} ><img src={buttonPass} alt="buttonPass" /></button>)
        }else{
          return (<button className='eye__close' onClick={ChangeEye2} ><img src={eyeClose} alt="eyeClose" /></button>)
        }
      }

    return(
        <form onSubmit={createNewUser} className='registration-form'>
            <div className="reg-wrapper">
                <div className='registration-descr'>Имя</div>
                <LoginInput
                    onChange={e =>setRegistrationData({...registrationData, name:(e.target.value)})}
                    value={registrationData.name}
                    type='text'
                    placeholder="Введите своё имя"
                />
                </div>
            <div className="reg-wrapper">
                <div className='registration-descr'>Фамилия</div>
                <LoginInput
                    onChange={e =>setRegistrationData({...registrationData, surname:(e.target.value)})}
                    value={registrationData.surname}
                    type='text'
                    placeholder="Введите свою фамилию"
                />
            </div>
            <div className="reg-wrapper">
                <div className='registration-descr'>Email</div>
                <LoginInput
                    onChange={e =>setRegistrationData({...registrationData, email:(e.target.value)})}
                    value={registrationData.email}
                    type='text'
                    placeholder="Введите свою почту"
                />          
            </div>
            <div className="reg-wrapper">
                <div className='registration-descr'>Пароль</div>
                    <div className='pass-wrapper'>
                        <LoginInput
                            onChange={e =>setRegistrationData({...registrationData, password:(e.target.value)})}
                            value={registrationData.password}
                            type={hidePassword? 'password': 'text'}
                            placeholder="Введите пароль">  
                    </LoginInput>
                    {tooglePass()}
                </div>   
            </div>
            <div className="reg-wrapper">
                <div className='pass-wrapper'>
                        <LoginInput
                            onChange={e =>setPasswordConfirm((e.target.value))}
                            value={passwordConfirm}
                            type={hidePassword2? 'password': 'text'}
                            placeholder="Введите пароль">  
                    </LoginInput>
                    {tooglePass2()}
                </div>  
            </div>
            {requestLoading
            ? <ButtonLoading />
            : <LoginButton disabled ={
              registrationData.name.length === 0 
              || registrationData.surname.length === 0 
              || registrationData.email.length === 0
              || registrationData.password.length === 0
              || registrationData.password !== passwordConfirm 
              ? 'disabled' :''} 
              type='submit'>
                  Зарегистрироваться
              </LoginButton>
            }
            
         </form>
         
    )
}

export default RegistrationForm