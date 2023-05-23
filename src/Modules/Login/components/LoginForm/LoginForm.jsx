import {React, useState} from "react";
import LoginButton from "../../../UI/button/LoginButton";
import LoginInput from '../../../UI/input/LoginInput'

import { Link, useNavigate } from "react-router-dom";
import SetCookie from "../../../cookieConroller/setCookie";
import globalService from "../../../../API/PostService";
import ButtonLoading from "../../../UI/ButtonLoading/ButtonLoading";
import buttonPass from './../../../../img/buttonPass.svg'
import eyeClose from './../../../../img/eyeClose.svg'
import { Store } from "react-notifications-component";
function LoginForm(){
  const [userData, setUserData] = useState({email:'', password:''})
  const [requestLoading, setRequestLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

const navigate = useNavigate()

const signInPost = async (userData) => {
  setRequestLoading(true)
  const signInRequest = await globalService('signIn', userData)
  if(signInRequest[0] === 'complete'){
    SetCookie('token', signInRequest[1].token )
    SetCookie('refreshToken', signInRequest[1].refreshToken )
    navigate('/boards')  
    }
  setRequestLoading(false)
  if(signInRequest[0] === 'error'){
        //уведомление
        Store.addNotification({
            title: "Ошибка!",
            message: signInRequest[1],
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

}
  function signIn(e){
    e.preventDefault()
    signInPost(userData)
  }    
  const ChangeEye = (e) => {
    e.preventDefault()
    hidePassword? setHidePassword(false):setHidePassword(true)
  }
  const tooglePass = () => {
    if(hidePassword){
      return (<button className='eye' onClick={ChangeEye} ><img src={buttonPass} alt="buttonPass" /></button>)
    }else{
      return (<button className='eye__close' onClick={ChangeEye} ><img src={eyeClose} alt="eyeClose" /></button>)
    }
  }


    return(
        <form onSubmit={signIn} className='form'>
            <div className="login-email">
              <div className='login-descr'>Email</div>
              <LoginInput
                onChange={e =>setUserData({...userData, email:(e.target.value)})}
                value={userData.email}
                type='text' 
                placeholder="Введите свою почту">
              </LoginInput>
            </div>
           
             
            <div className="login-password">
              <div className='login-descr'>Пароль</div>
                <div className='pass-wrapper'>
                    <LoginInput
                            onChange={e =>setUserData({...userData, password:(e.target.value)})}
                            value={userData.password}
                            type={hidePassword? 'password': 'text'}
                            placeholder="Введите пароль">  
                    </LoginInput>
                    
                    {tooglePass()}

                  </div>          
            </div>
           
             <div className="remember-link">
                <Link to ='/forgottenpassword'> Забыли пароль?</Link>
             </div>
            {
              requestLoading
              ?<ButtonLoading/>
              : <LoginButton disabled ={userData.password.length === 0 || userData.email.length === 0 ?"disabled": ''} type='submit'>Войти</LoginButton>
            }
           
            
        </form>    )
}

export default LoginForm