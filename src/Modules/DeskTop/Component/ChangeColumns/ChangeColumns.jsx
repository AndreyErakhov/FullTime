import ContentBlock from "../../../UI/ContentBlock/ContentBlock"
import BtnChange from "./BtnChange/BtnChange"
import ContentCenterDeskTop from "./ContentCenter/ContentCenterDeskTop"

const ChangeColumns = (props) => {
    return(
        <div className="change__columns">
            <BtnChange
            activeModal={props.activeModal} 
            columns={props.columns} 
            activeContentAddColumn={props.activeContentAddColumn}
            />
            <ContentBlock>
                
                <ContentCenterDeskTop 
                taskTitle={props.taskTitle}
                taskDescription={props.taskDescription}
                activeModal={props.activeModal} 
                columns={props.columns} 
                setColumns={props.setColumns} 
                activeContentAddColumn={props.activeContentAddColumn}

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