import ContentBlock from "../../../UI/ContentBlock/ContentBlock"
import BtnReady from "./BtnReady/BtnReady"
import EllipseReady from './img/EllipseReady.svg'
import classes from './ContentCenter/ContentCenter.module.css'
import ContentCenter from "./ContentCenter/ContentCenter"
const AddColumn = (props) => {
    return(
        <div className="add__column">
            <BtnReady activeContentColumns={props.activeContentColumns}/>
            <ContentBlock>
                <button className={classes.btn__column} onClick={props.activeContentColumns}>
                    <img className={classes.img__ready} src={EllipseReady} alt='ready'/>
                </button>
                <ContentCenter 
                setTaskTitle={props.setTaskTitle}
                left={props.left}
                sortColumns={props.sortColumns}
                right={props.right}
                columnTitle={props.columnTitle} 
                // setColumnTitle={props.setColumnTitle} 
                addNewColumn={props.addNewColumn} 
                columns={props.columns} 
                // activeContentColumns={props.activeContentColumns}
                setColumns={props.setColumns}
                sortCards={props.sortCards}
                />
                
            </ContentBlock>
        </div>
    )
}

export default AddColumn