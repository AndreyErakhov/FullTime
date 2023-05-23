import React, { useState } from 'react';
import deleteColumn from './../../../../img/delete.svg';
import clasColumns from './Columns.module.css'
import deleteWhite from './../../../../img/deleW.svg'
import RightArrow from './img/RightArrow.svg'
import LeftArrow from './img/LeftArrow.svg'
import Card from './Card/Card';



const Columns = (props) => {

    const [activeBox,setActiveBox] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState('')
    const [text, setText] = useState(16)

    function textValue(e) {
        e.preventDefault()
        setValue(e.target.value)
        if(props.column.columnTitle.length >= 16){
            setText(props.column.columnTitle.length)
        }else if (props.column.columnTitle.length <= 16){
            setText(16)
        }
        props.column.columnTitle = e.target.value 
    }
   
    function active(){
        if(activeBox === false){
            setActiveBox(true)
        } else if (activeBox === true){
            setActiveBox(false)
        }
    }

    return(
        <div className={clasColumns.column}>
            <div className={clasColumns.column__block}>
                <div className={clasColumns.column__content}>
                    <div className={clasColumns.column__title}>
                        <input 
                            className={clasColumns.column__input}
                            style={{width: `${text}ch`}}
                            type='text'
                            autoComplete="off"
                            placeholder='Название столбца'
                            onChange={textValue}
                            value={props.column.columnTitle}
                        />
                        
                        <button className={clasColumns.column__btn} onClick={active}>
                            {activeBox
                            ?<img src={deleteWhite} alt='delete'/>
                            :<img className={clasColumns.delete} src={deleteColumn} alt="delete" />
                            }
                            
                        </button>
                        <div className={ activeBox ? `${clasColumns.container} ${clasColumns.active}` : clasColumns.container}>
                            <p className={clasColumns.box__text}>Уверены?</p>
                            <div className={clasColumns.container__box} >
                                <button className={clasColumns.box} onClick={() => props.remove(props.column)}>Да</button>
                                <button className={clasColumns.box} onClick={() => setActiveBox(false)}>Нет</button>
                            </div>
                        </div>
                    </div>

                    { props.tasks.length
                    ? <>
                        {props.tasks.map( task =>{
                        return (
                        <Card 
                        taskTitle={task.taskTitle}
                        comment={task.comment}
                        column={props.value} 
                        task={task} 
                        key={task.id}
                        />
                               )
                           }
                        )}
                        </>
                    :<div className={clasColumns.title__column}>
                        <p className={clasColumns.title__text}>в этом столбце пока нет задач</p>
                    </div>
                    }
                    <div className={clasColumns.btn__column}>
                    <button onClick={e => props.left(e, props.column.columnOrder)} className={ props.columns.length === 1 ? clasColumns.btn__none : clasColumns.btn__left}>
                        <img src={LeftArrow} alt="LeftArrow" />
                    </button>
                    <button onClick={e => props.right(e, props.column.columnOrder)} className={ props.columns.length === 1 ? clasColumns.btn__none : clasColumns.btn__right}>
                        <img src={RightArrow} alt="RightArrow" />
                    </button>
                    </div>

                </div>
                
                
            </div> 
            <div className={clasColumns.block}></div>
        </div>
    )
}

export default Columns