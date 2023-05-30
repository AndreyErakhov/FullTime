import { useEffect } from "react"
import ModalExit from "./../../../../img/modalExit.svg"
import classes from './ModalColumn.module.css'
import { useState } from "react"

const ModalColumn = ({modalActive, setModalActive, addNewTaks, taskTitle, taskDescription, setTaskTitle,setTaskDescription}) => {
    const [checkInputTitle, setCheckInputTitle] = useState(false)
    useEffect(() => {
        if(taskTitle === '') {
            setCheckInputTitle(false)
        }else{
            setCheckInputTitle(true)
        }
    },[taskTitle])
    return(
        <div className={modalActive ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => setModalActive(false)}>
            <div className={classes.modal__content} onClick = { e => e.stopPropagation()}>
                
                <div className={classes.modal__box}>
                <div className={classes.modal__text}>
                        <p>Создать задачу</p>
                        <button className={classes.modal__btn__form} onClick={() => setModalActive(false)}>
                            <img src={ModalExit} alt="exet"/>
                        </button>
                </div>
                    <form className={classes.form}>
                        <input 
                        onChange={e => setTaskTitle(e.target.value)}
                        value={taskTitle} 
                        className={classes.modal__input_title} 
                        placeholder="Введите название задачи"/>
                        <div className={classes.modal__block_title}></div>
                        <input 
                        onChange={e => setTaskDescription(e.target.value)}
                        value={taskDescription} 
                        className={classes.modal__input_comment} 
                        placeholder="Введите комментарий"/>
                        <div className={classes.modal__block_comment}></div>
                        <button onClick={addNewTaks} disabled={!checkInputTitle} className={ taskTitle ? classes.active__btn : classes.modal__btn}>Создать</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalColumn