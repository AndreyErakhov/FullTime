
import classes from './../../../../UI/ContentCenter/ContentCenter.module.css'
import classCenter from './ContentCenterDeskTop.module.css'
import ChangeColumnsWhite from './../../../../../img/ChangeColumnsWhite.svg'
import ContentCenterColumn from './ContentCenterColumn/ContentCenterColumn'
import AddElipseBtn from './../../../../../img/AddElipseBtn.svg'

const ContentCenterDeskTop = (props) => {
    return(
        <>
        {props.columns.length 
        
        ? <>
        <div className={classCenter.content}>

                <div className={ props.columns.length ? classCenter.content__columns : classCenter.content__block}>
                    <div className={classCenter.content__columns__center}>

                        {props.columns.map(column  => {
                        return <ContentCenterColumn
                        taskTitle={props.taskTitle}
                        column={column} 
                        key={column.columnId} 

                        dragOverHandler={props.dragOverHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        dropCardHandler={props.dropCardHandler}
                        />
                        })} 
                    </div>
                </div>
            </div>
            <button className={classCenter.add__elipse_btn} onClick={() => props.activeModal(true)}>
                <img src={AddElipseBtn} alt="AddElipseBtn" />
            </button>

        </>
        : <div className={classes.cantant__center}>
                <div className={classes.contant__box}>
                    <p>Эта доска пустая. Создайте первый</p>
                    <p>столбик</p>
                    <button className={classes.contant__button} onClick={props.activeContentAddColumn}>
                        <img src={ChangeColumnsWhite} alt='column'/><p>Изменить столбцы</p>
                    </button>
                </div>
          </div>
        }
        
        </>

    )
}

export default ContentCenterDeskTop 