import classes from './ContentCenter.module.css'
import clasColumns from './../../Columns/Columns.module.css'
import PlusBoard from './../img/PlusBoard.svg'
import Columns from '../../Columns/Columns'


const ContentCenter = (props) => {

    const removePost = (post) => {
        let array = props.columns.reverse()
        for( let col of array){
            if(col.columnOrder === post.columnOrder){
                break
            }else{
                col.columnOrder = col.columnOrder - 1
            }
        }
        array = array.reverse() 
       props.setColumns(array.filter(p => p.columnId !== post.columnId))
       
    }
    
    
    return(
        <div className={classes.content} >
            <div className={ props.columns.length ? classes.content__columns : classes.content__block}>
                <div className={classes.content__columns__center}>
                    <div className={clasColumns.block__columns}>
                    {props.columns.sort(props.sortColumns).map(column => {
                        
                        return <Columns 
                        
                        setTitle={props.setTitle}
                        columnTitle={column.columnTitle}
                        tasks={column.tasks}
                        left={props.left}
                        right={props.right}
                        textValue={props.textValue} 
                        setTextValue={props.setTextValue} 
                        remove={removePost} 
                        column={column}
                        columns={props.columns} 
                        key={column.columnId} 
                        setColumns={props.setColumns}
                        dragStartHendler={props.dragStartHendler}
                        dragEndHandler={props.dragEndHandler}
                        dragOverHandler={props.dragOverHandler}
                        dropHandler={props.dropHandler}
                        sortCards={props.sortCards}
                        />
                        })} 
                    </div>
                    <div className={ props.columns.length ? classes.content__center : classes.content }>
                        <button className={classes.content__btn} onClick={props.addNewColumn}>
                            <img src={PlusBoard}  alt='plus'/>
                            <p>Добавить столбец</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentCenter