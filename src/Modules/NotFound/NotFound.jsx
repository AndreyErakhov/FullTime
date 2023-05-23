import React from "react";
import ContentBlock from "../UI/ContentBlock/ContentBlock";
import Logo404 from '../../img/Logo404.svg'
import LogoMini from '../../img/LogoMini.svg'
import './notFound.css'

function NotFound (){
    return(
    <div className="content-body"> 
        <div className="logoMini">
            <img src={LogoMini} alt="" />
        </div>
        <ContentBlock>
            <div className="content404">
                <div className="wrapper404">
                    <img src={Logo404} alt="" />
                </div>
                <div className="descr404">
                    Такой страницы не существует :(
                </div>
            </div>
        </ContentBlock>  
    </div> 
 )
}

export default NotFound