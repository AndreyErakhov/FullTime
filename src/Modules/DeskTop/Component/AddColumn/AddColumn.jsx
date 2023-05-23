import ContentBlock from "../../../UI/ContentBlock/ContentBlock"
import BtnReady from "./BtnReady/BtnReady"
import EllipseReady from './img/EllipseReady.svg'
import classes from './ContentCenter/ContentCenter.module.css'
import ContentCenter from "./ContentCenter/ContentCenter"
const AddColumn = (props) => {
    return(
        <div className="add__column">
            <BtnReady active={props.active}/>
            <ContentBlock>
                <button className={classes.btn__column} onClick={props.active}>
                    <img className={classes.img__ready} src={EllipseReady} alt='ready'/>
                </button>
                <ContentCenter 
                setTitle={props.setTitle}
                left={props.left}
                sortColumns={props.sortColumns}
                right={props.right}
                textValue={props.textValue} 
                setTextValue={props.setTextValue} 
                addNewColumn={props.addNewColumn} 
                columns={props.columns} 
                active={props.active}
                setColumns={props.setColumns}
                sortCards={props.sortCards}
                />
                
            </ContentBlock>
        </div>
    )
}

export default AddColumn