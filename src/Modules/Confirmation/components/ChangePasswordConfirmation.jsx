import React from "react";
import LoginInput from '../../UI/input/LoginInput'
//import ButtonPass from "../../UI/eye/ButtonPass";
import '../confirmation.css'
import { useState } from "react";
import buttonPass from './../../../img/buttonPass.svg'
import eyeClose from './../../../img/eyeClose.svg'


function ChangePasswordConfirmation(props){
const {dataOnChange,dataValue,confirmOnChange,confirmValue, children} = props
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)

    

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
        <div className="changePassword-content">
             <div className="greetings-confirmation">Здравствуйте, {props.name} {props.surname}</div>
                <div className="changePassword-wrapper">
                <div className="reg-wrapper">
                <div className='registration-descr'>Пароль</div>
                    <div className='pass-wrapper'>
                        <LoginInput
                            onChange={dataOnChange}
                            value={dataValue}
                            type={hidePassword? 'password': 'text'}
                            placeholder="Введите пароль"
                            key='1'
                            >  
                    </LoginInput>
                    {tooglePass()}
                </div>   
            </div>
            <div className="reg-wrapper">
            <div className='registration-descr'>Повторите пароль</div>  
                <div className='pass-wrapper'>
                        <LoginInput
                            onChange={confirmOnChange}
                            value={confirmValue}
                            type={hidePassword2? 'password': 'text'}  
                            placeholder="Введите пароль"
                           key='2'
                           > 
                    </LoginInput>
                    {tooglePass2()}
                </div>  
            </div>
            
                
                    {children}
                </div>
                <div className="changePassword-descr">Измените пароль для восстановления доступа к аккаунту</div>
        </div>
    )
}

export default ChangePasswordConfirmation