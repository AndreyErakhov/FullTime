import { useEffect } from "react"
import ModalExit from "./../../../../img/modalExit.svg"
import classes from './ModalColumn.module.css'
import { useState } from "react"

const ModalColumn = ({active, setActive, addNewTaks, columnTitle, comment, setTitle,setComment}) => {
    const [checkInputTitle, setCheckInputTitle] = useState(false)
    useEffect(() => {
        if(columnTitle === '') {
            setCheckInputTitle(false)
        }else{
            setCheckInputTitle(true)
        }
    },[columnTitle])
    return(
        <div className={active ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => setActive(false)}>
            <div className={classes.modal__content} onClick = { e => e.stopPropagation()}>
                
                <div className={classes.modal__box}>
                <div className={classes.modal__text}>
                        <p>Создать задачу</p>
                        <button className={classes.modal__btn__form} onClick={() => setActive(false)}>
                            <img src={ModalExit} alt="exet"/>
                        </button>
                </div>
                    <form className={classes.form}>
                        <input 
                        onChange={e => setTitle(e.target.value)}
                        value={columnTitle} 
                        className={classes.modal__input_title} 
                        placeholder="Введите название задачи"/>
                        <div className={classes.modal__block_title}></div>
                        <input 
                        onChange={e => setComment(e.target.value)}
                        value={comment} 
                        className={classes.modal__input_comment} 
                        placeholder="Введите комментарий"/>
                        <div className={classes.modal__block_comment}></div>
                        <button onClick={addNewTaks} disabled={!checkInputTitle} className={ columnTitle ? classes.active__btn : classes.modal__btn}>Создать</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalColumn