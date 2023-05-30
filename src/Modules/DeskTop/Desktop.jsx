/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Header from "../UI/Header/Header"
import classes from './DesKtop.module.css'
import AddColumn from "./Component/AddColumn/AddColumn"
import ChangeColumns from "./Component/ChangeColumns/ChangeColumns"
import InlineBlock from "./Component/InlineBlock/InlineBlock"
import ModalColumn from "./Component/ModalColumn/ModalColumn"
import globalService from "../../API/PostService"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import Loading from "../BoardList/Component/Loading/Loading"

const DeskTop = () => {
    const [active, setActive] = useState(false);
    const [modalActive,setModalActive] = useState(false);
    const [columns, setColumns] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('');
    const [boardTitle, setBoardTitle] = useState('Загрузка ...')
    const [newColumns, setNewColumns] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)

    let location = useLocation()
    const query = queryString.parse(location.search)
    const boardID = {BoardID:query.BoardID}

    useEffect(() => {
        const desktopDataAPI = async () => {
            setPostsLoading(true)
            const postsRequest = await globalService('GetColumns',boardID);
            setColumns(postsRequest.columns);
            setBoardTitle(postsRequest.boardTitle)
            setPostsLoading(false)
         }
         desktopDataAPI();
       }, []);
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
        setNewColumns([...newColumns, newColumn.columnId])
    }
    const addNewTaks = (e) => {
        e.preventDefault()
        const newTask = {
            taskId: Date.now(),
            taskTitle,
            taskDescription,
            
        }
        columns[0].tasks.push(newTask)
        setColumns(columns)
        setModalActive(false)
        setTaskTitle('')
        setTaskDescription('')

    }


    function activeContentColumns(){
        let boolen = false
        for(let k of columns){
            if(k.columnTitle === ''){
                setActive(true)
                boolen = false
            }
            else{
                setActive(false)
                boolen = true
            }
        }

        if (columns.length === 0){
            setActive(false)
        }
        if(boolen === true && columns.length !== 0){
            for(let k of columns){
                if( newColumns.find((i) => i === k.columnId) !== -1){
                  delete k.columnId
                }
            }
            const data = {columns:columns, boardId: +query.BoardID}
            const updateColumns = async (data) => {
                setPostsLoading(true)
                const postsRequest = await globalService('updateColumns',data);
                setColumns(postsRequest[1].columns);
                setPostsLoading(false)
            }
            updateColumns(data);
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
        const currentId = board.tasks.map(item => item.taskId)
        if (!currentId.includes(currentItem.taskId)) {
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

            <InlineBlock boardTitle={boardTitle}/>
            
            {active
            ?<AddColumn
            setTaskTitle={setTaskTitle}
            right={right} 
            left={left}
            sortCards={sortCards}
            sortColumns={sortColumns}
            activeContentColumns={activeContentColumns}
            columns={columns} 
            setColumns={setColumns}
            addNewColumn={addNewColumn} 
            />


            :<ChangeColumns
            taskDescription={taskDescription}
            taskTitle={taskTitle}
            activeModal={activeModal} 
            columns={columns} 
            setColumns={setColumns} 
            activeContentAddColumn={activeContentAddColumn}
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
            dropHandler={dropHandler}
            dropCardHandler={dropCardHandler}

            />
            }

            <ModalColumn 
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            addNewTaks={addNewTaks}
            setModalActive={setModalActive} 
            modalActive={modalActive}
            />
            <Loading postsLoading={postsLoading}/>  
        </div>

    )
}

export default DeskTop