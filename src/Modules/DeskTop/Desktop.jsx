import { useState } from "react"
import Header from "../UI/Header/Header"
import classes from './DesKtop.module.css'
import AddColumn from "./Component/AddColumn/AddColumn"
import ChangeColumns from "./Component/ChangeColumns/ChangeColumns"
import InlineBlock from "./Component/InlineBlock/InlineBlock"
import ModalColumn from "./Component/ModalColumn/ModalColumn"
// import globalService from "../../API/PostService"
// import { useLocation } from "react-router-dom"
// import queryString from "query-string"

const DeskTop = () => {
    const [active,setActive] = useState(false);
    const [modalActive,setModalActive] = useState(false);
    const [columns, setColumns] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('');


    // let location = useLocation()
    // const query = queryString.parse(location.search)
    // const boardID = {BoardID:query.BoardID}
    // useEffect(() => {
        
    //     const desktopDataAPI = async () => {
    //         setPostsLoading(true)
    //         const postsRequest = await globalService('GetColumns',boardID);
    //         setColumns(postsRequest.columns);
    //         setPostsLoading(false)
    //      }
    //      desktopDataAPI();
    //    }, []);
    
    const activeModal = () => {
        setModalActive(true)
    }
    
    const addNewColumn = (e) => {
        e.preventDefault()
        const newColumn = {
            columnId: Date.now(),
            columnOrder: columns.length,
            columnTitle:'',
            tasks:[]
        }
        setColumns([...columns, newColumn])
    }
    const addNewTaks = (e) => {
        e.preventDefault()
        const newTask = {
            taskId: Date.now(),
            taskTitle,
            taskDescription,
            columnId:0,
        }
        columns[0].tasks.push(newTask)
        setColumns(columns)
        setModalActive(false)
        setTaskTitle('')
        setTaskDescription('')
    }

    

    function activeContentColumns(){
        
        for(let k of columns){
            if(k.columnTitle === ''){
                setActive(true)
            }
            else{
                setActive(false)
            }
        }
        if (columns.length === 0){
            setActive(false)
        }
    }


    function activeContentAddColumn(e){
        e.preventDefault()
        setActive(true)
    }


//==========DRAG ON DROP============

    function dragOverHandler(e){
        e.preventDefault()
        if(e.target.className === 'item'){
          e.target.style.boxShadow = '0 2px 3px gray'
        }
      }
      function dragLeaveHandler(e){
        e.target.style.boxShadow = 'none'
        
      }
      function dragStartHandler(e, board, item){
        setCurrentBoard(board)
        setCurrentItem(item)
      }
      function dragEndHandler(e){
        e.target.style.boxShadow = 'none'
      }
      function dropHandler(e, board, item){
        e.preventDefault()
        const currentIndex = currentBoard.tasks.indexOf(currentItem)
        currentBoard.tasks.splice(currentIndex, 1)
        const dropIndex = board.tasks.indexOf(item)
        board.tasks.splice(dropIndex + 1, 0, currentItem)
        setColumns(columns.map(b => {
          if(b.columnId === board.columnId){
            return board
          }
          if(b.columnId === currentBoard.columnId){
            return currentBoard
          }
          return b
        }))
      }
    
    
      function dropCardHandler(e,board){
        const currentId = board.tasks.map(item => item.id)
        if (!currentId.includes(currentItem.id)) {
         board.tasks.push(currentItem)
         const currentIndex = currentBoard.tasks.indexOf(currentItem)
         currentBoard.tasks.splice(currentIndex, 1)
         setColumns(columns.map(b => {
            if (b.columnId === board.columnId) {
               return board
            }
            if (b.columnId === currentBoard.columnId) {
               return currentBoard
            }
            return b
         }))
      }
      }
//===============================


    
    
    const right = (e, columnOrder ) => {
        e.preventDefault()
        setColumns(columns.map( column => {
            if (column.columnOrder === columnOrder) {
                return {...column, columnOrder: columnOrder+1}
            }
            if (column.columnOrder === columnOrder+1) {
                return {...column, columnOrder: columnOrder}
            }
            return column
        }))
        
    }
    const left = (e, columnOrder ) => {
        e.preventDefault()
        setColumns(columns.map( column => {
            if (column.columnOrder === columnOrder) {
                return {...column, columnOrder: columnOrder-1}
            }
            if (column.columnOrder === columnOrder-1) {
                return {...column, columnOrder: columnOrder}
            }
            return column
        }))
        
    }

    const sortColumns = (a, b) => {
        if(a.columnOrder > b.columnOrder){
            return 1
        }else {
           return -1
        }
    }
    const sortCards = (a, b) => {
        if(a.order > b.order){
            return 1
        }else {
           return -1
        }
    }

    return(
        <div className={classes.container}>
            <Header />

            <InlineBlock />
            
            {active
            ?<AddColumn
            setTitle={setTaskTitle}
            right={right} 
            left={left}
            sortCards={sortCards}
            sortColumns={sortColumns}
            columns={columns} 
            active={activeContentColumns}
            setColumns={setColumns}
            addNewColumn={addNewColumn} 
            />


            :<ChangeColumns
            comment={taskDescription}
            columnTitle={taskTitle}
            activeModal={activeModal} 
            columns={columns} 
            setColumns={setColumns} 
            active={activeContentAddColumn}
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
            dropHandler={dropHandler}
            dropCardHandler={dropCardHandler}

            />
            }

            <ModalColumn 
            comment={taskDescription}
            setComment={setTaskDescription}
            columnTitle={taskTitle}
            setTitle={setTaskTitle}
            addNewTaks={addNewTaks}
            setActive={setModalActive} 
            active={modalActive}/>

        </div>

    )
}

export default DeskTop