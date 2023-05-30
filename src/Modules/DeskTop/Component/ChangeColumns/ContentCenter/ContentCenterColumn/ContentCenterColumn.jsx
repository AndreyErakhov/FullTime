
import classes from './ContentCenterColumn.module.css'
import Card from '../../../Columns/Card/Card';




const ContentCenterColumn = (props) => {



    return(
        <div
        onDragOver={(e) => props.dragOverHandler(e)}
        onDrop={(e) => props.dropCardHandler(e, props.column)}
         className={classes.column}>

            <div className={classes.column__block}>
                <div className={classes.column__title}>
                    <p>{props.column.columnTitle}</p>
                </div>

                { props.column.tasks.length
                ? < >
                    {props.column.tasks.map( task =>{
                        return (
                        <Card 
                        taskTitle={task.taskTitle}
                        taskDescription={task.taskDescription}
                        task={task} 
                        key={task.taskId}
                        column={props.column}
                        dragOverHandler={props.dragOverHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        />
                        )
                    }
                    )}
                    </>
                   :<div className={classes.title__block}>
                        <p>В этом столбце пока нет задач</p>
                    </div>
                }
            </div> 
            <div className={classes.block}></div>
        </div>
    )
}

export default ContentCenterColumn