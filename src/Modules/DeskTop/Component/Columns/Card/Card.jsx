
import classes from './Card.module.css'
const Card = (props) => {

    return(
        
        <div 
        onDragOver={(e) => props.dragOverHandler(e)}
        onDragLeave={(e) => props.dragLeaveHandler(e)}
        onDragStart={(e) => props.dragStartHandler(e,props.column,props.task)}
        onDragEnd={(e) => props.dragEndHandler(e)}
        onDrop={(e) => props.dropHandler(e, props.column, props.task)}
        draggable={true}
        className={classes.content}
        >
            <div className={classes.content__text}>
                <p className={classes.task__text}>{props.taskTitle}</p>
                <p className={classes.task__comment}>{props.taskDescription}</p>
            </div>   
        </div>
    )
}

export default Card