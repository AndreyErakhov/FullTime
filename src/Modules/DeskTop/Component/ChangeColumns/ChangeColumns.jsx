import ContentBlock from "../../../UI/ContentBlock/ContentBlock"
import BtnChange from "./BtnChange/BtnChange"
import ContentCenterDeskTop from "./ContentCenter/ContentCenterDeskTop"

const ChangeColumns = (props) => {
    return(
        <div className="change__columns">
            <BtnChange
            activeModal={props.activeModal} 
            columns={props.columns} 
            active={props.active}
            />
            <ContentBlock>
                
                <ContentCenterDeskTop 
                columnTitle={props.columnTitle}
                comment={props.comment}
                activeModal={props.activeModal} 
                textValue={props.textValue} 
                columns={props.columns} 
                setColumns={props.setColumns} 
                active={props.active}

                dragOverHandler={props.dragOverHandler}
                dragLeaveHandler={props.dragLeaveHandler}
                dragStartHandler={props.dragStartHandler}
                dragEndHandler={props.dragEndHandler}
                dropHandler={props.dropHandler}
                dropCardHandler={props.dropCardHandler}
                />
            </ContentBlock>
        </div>
    )
}

export default ChangeColumns