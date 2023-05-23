/* eslint-disable jsx-a11y/alt-text */
import delet from './../../../../../img/delete.svg'
import deleteWhite from './../../../../../img/deleW.svg'
import classes from './BoardContent.module.css'
import { useState } from 'react';
import globalService from '../../../../../API/PostService';

import { Store } from 'react-notifications-component';
import { NavLink } from 'react-router-dom';


const BoardContent = ({remove,post}) => {
    const [activeBox,setActiveBox] = useState(false);
    
    function active(){
        
        if(activeBox === false){
            setActiveBox(true)
        } else if (activeBox === true){
            setActiveBox(false)
        }
    }

    const deletePost = async (post) => {
        const postsRequest = await globalService('deleteBoard',post);
        if(postsRequest[0] === 'complete'){
        remove(post) 

            //уведомление
            Store.addNotification({
                title: "Успех!",
                message: postsRequest[1],
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
        if (postsRequest[0] === 'error'){
            //уведомление
            Store.addNotification({
                title: "Ошибка!",
                message: postsRequest[1],
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


    return(
        <NavLink to={`/desktop?BoardID=${post.boardId}`} className={ classes.boards__bottom} >
            <div className={classes.board__block}>
                <div className={classes.boards__content}>
                    <img className={classes.board__admin_1} src={post.board_picture}/>
                    <div className={classes.board__text}>
                        <p>{post.title}</p>
                    </div>
                    <p className={classes.board__date}>{post.date}</p>
                    <div className={classes.board__admin}>
                        <div onClick={e => e.preventDefault()} className={classes.board__box}>
                            <img className={classes.board__admin2} src={post.admins[0].profile_picture}/>
                            <div className={classes.board__name}>
                            <p className={classes.name}>{post.admins[0].nameAndSurname}</p>
                            </div>
                        </div>
                    
                    </div>
                </div>
            
                <div onClick={e => e.preventDefault()} className={classes.delete} >
                    
                    <button className={classes.delet__btn} onClick={() => active()}>
                        {activeBox
                        ?<img className={classes.delete__img} src={deleteWhite} alt='delete'/>
                        :<img className={classes.delete__img} src={delet} alt="delete" />
                        }
                    </button>
                </div>
                
            </div>
            <div onClick={e => e.preventDefault()} className={ activeBox ? `${classes.container} ${classes.active}` : classes.container}>
                <p>Уверены?</p>
                <div className={classes.container__box} >
                    <button className={classes.box} onClick={() => deletePost(post)}>Да</button>
                    <button className={classes.box} onClick={() => setActiveBox(false)}>Нет</button>
                </div>
            </div>
            
        </NavLink>
    )
}

export default BoardContent