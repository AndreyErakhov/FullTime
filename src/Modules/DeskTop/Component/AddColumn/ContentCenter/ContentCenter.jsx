import classes from './ContentCenter.module.css'
import clasColumns from './../../Columns/Columns.module.css'
import PlusBoard from './../img/PlusBoard.svg'
import Columns from '../../Columns/Columns'


const ContentCenter = ({columnTitle,setTaskTitle,left,sortColumns,right,addNewColumn,columns,activeContentColumns,setColumns,sortCards}) => {

    const removePost = (post) => {
        let array = columns.reverse()
        for( let col of array){
            if(col.columnOrder === post.columnOrder){
                break
            }else{
                col.columnOrder = col.columnOrder - 1
            }
        }
        array = array.reverse() 
       setColumns(array.filter(p => p.columnId !== post.columnId))
       
    }
    

    
    return(
        <div className={classes.content} >
            <div className={ columns.length ? classes.content__columns : classes.content__block}>
                <div className={classes.content__columns__center}>
                    <div className={clasColumns.block__columns}>
                    {columns.sort(sortColumns).map(column => {
                        return <Columns 
                        setTaskTitle={setTaskTitle}   
                        columnTitle={columnTitle}
                        tasks={column.tasks}
                        left={left}
                        right={right}
                        // textValue={textValue} 
                        // setColumnTitle={setColumnTitle} 
                        remove={removePost} 
                        column={column}
                        columns={columns} 
                        key={column.columnId} 
                        setColumns={setColumns}
                        // dragStartHendler={props.dragStartHendler}
                        // dragEndHandler={props.dragEndHandler}
                        // dragOverHandler={props.dragOverHandler}
                        // dropHandler={props.dropHandler}
                        sortCards={sortCards}
                        />
                        })} 
                    </div>
                    <div className={ columns.length ? classes.content__center : classes.content }>
                        <button className={classes.content__btn} onClick={addNewColumn}>
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