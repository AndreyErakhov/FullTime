import React, { useState } from 'react';
import deleteColumn from './../../../../img/delete.svg';
import clasColumns from './Columns.module.css'
import deleteWhite from './../../../../img/deleW.svg'
import RightArrow from './img/RightArrow.svg'
import LeftArrow from './img/LeftArrow.svg'
import Card from './Card/Card';



const Columns = ({columnTitle,tasks,left,right,remove,column,columns,setColumns,sortCards}) => {

    const [activeBox,setActiveBox] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(column.columnTitle)
    const [text, setText] = useState(18)
    console.log(value)
    function textValue(e) {
        e.preventDefault()
        setValue(e.target.value)
        if(column.columnTitle.length >= 18){
            setText(column.columnTitle.length)
        }else if (column.columnTitle.length <= 18){
            setText(18)
        }
        column.columnTitle = e.target.value 
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
                            value={value}
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
                                <button className={clasColumns.box} onClick={() => remove(column)}>Да</button>
                                <button className={clasColumns.box} onClick={() => setActiveBox(false)}>Нет</button>
                            </div>
                        </div>
                    </div>

                    { tasks.length
                    ? <>
                        {tasks.map( task =>{

                        return (
                        <Card 
                        taskTitle={task.taskTitle}
                        taskDescription={task.taskDescription}
                        columnTitle={columnTitle} 
                        task={task} 
                        key={task.taskId}
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
                    <button onClick={e => left(e, column.columnOrder)} className={columns.length === 1 ? clasColumns.btn__none : clasColumns.btn__left}>
                        <img src={LeftArrow} alt="LeftArrow" />
                    </button>
                    <button onClick={e => right(e, column.columnOrder)} className={ columns.length === 1 ? clasColumns.btn__none : clasColumns.btn__right}>
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