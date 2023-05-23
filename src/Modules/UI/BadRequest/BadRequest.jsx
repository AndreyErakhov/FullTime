import React from "react";
import ContentBlock from "../ContentBlock/ContentBlock";
import Logo500 from '../../../img/Logo500.svg'
import LogoMini from '../../../img/LogoMini.svg'

function BadRequest (){
    return(
    <div className="content-body"> 
        <div className="logoMini">
            <img src={LogoMini} alt="" />
        </div>
        <ContentBlock>
            <div className="content404">
                <div className="wrapper404">
                    <img src={Logo500} alt="" />
                </div>
                <div className="descr404">
                    Такой страницы не существует :(
                </div>
            </div>
        </ContentBlock>  
    </div> 
 )
}

export default BadRequest