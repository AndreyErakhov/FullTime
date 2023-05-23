import { React } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Blob from '../UI/blob/Blob';
import Logo from '../UI/Logo/Logo';
import LoginForm from './components/LoginForm/LoginForm';
import './login.css'
import GetCookie from '../cookieConroller/getCokie'
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


function Login() {
  let token = GetCookie('token')
  
  if(token){
      return <Navigate to='/boards' replace={true}/>
    } else { 
      return(
        <div>
          <div style={{top:0, position:'fixed'}}>
            <ReactNotifications/>
          </div>
        
          <section className='login-content'>
          
            <Logo/>
            <Blob/>
            <h1> Добро пожаловать</h1>
            <LoginForm/>
            <div className='registrationLink'>
              <Link to ='/registration'>Создать новый аккаунт</Link>
            </div>
            <div className='rulesLink'>
              Нажимая вы соглашаетесь с политикой конфиденциальности
            </div>
        </section>  
        </div>
    )
}
}
export default Login;
