/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classes from './Header.module.css'
/* import img */
import logo from './../../../img/Logo.svg'
import notification from './../../../img/notification.svg'
import Ellipse from './../../../img/Ellips.svg'
import exit from './../../../img/exit.svg'
import { NavLink, useNavigate } from "react-router-dom";
import RemoveCookie from "../../cookieConroller/removeCookie";
import globalService from "../../../API/PostService";
import SetCookie from "../../cookieConroller/setCookie";
import GetCookie from "../../cookieConroller/getCokie";

const Header = () => {
    const [profileImg, setProfileImg] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const profileImgLoader = async () => {
            const postsRequest = await globalService('GetProfile');
            if(postsRequest[0] === 'complete'){
                setProfileImg(postsRequest[1].profile_picture);
                SetCookie('profileImg', postsRequest[1].profile_picture);
            }else{
                setProfileImg(Ellipse);
            }}
            if(GetCookie('profileImg')){
               setProfileImg(GetCookie('profileImg'))
            }else{
                profileImgLoader();
            }
        }, []);

    function deleteCookie() {
        RemoveCookie('token')
        RemoveCookie('refreshToken')
        RemoveCookie('profileImg')
        navigate('/')
    }
    return(
        <header className={classes.header}>
            
            <div className={classes.menu}>
                <div className={classes.logo}>
                    <a href="#"><img src={logo} alt="logo"/></a> 
                </div>
                <div className={classes.header__text}>
                    <NavLink to='/deskTop' className={({isActive}) => isActive ? classes.active__link : classes.nav}><p>Рабочий Стол</p></NavLink>
                    <NavLink to='/boards' className={({isActive}) => isActive ? classes.active__link : classes.nav}><p>Все Доски</p></NavLink>
                    <NavLink to="/deskTop2" className={({isActive}) => isActive ? classes.active__link : classes.nav}><p>Мои Задачи</p></NavLink>
                    <NavLink to="/deskTo3" className={({isActive}) => isActive ? classes.active__link : classes.nav}><p>Отчёт</p></NavLink>
                </div>
            </div>

            <div className={classes.icon__header}>
                <button><img className={classes.icon__nav} src={notification} alt=""/></button>
                <button><img className={classes.icon__nav_img} width='65px' src={profileImg} alt=""/></button>
                <button onClick={() => deleteCookie()}><img className={classes.icon__nav} src={exit} alt=""/></button>
            </div>

        </header>
    )
}

export default Header