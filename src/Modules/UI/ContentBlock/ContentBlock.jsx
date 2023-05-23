import classes from "./ContentBlock.module.css"
const ContentBlock = (props) => {
    return (
        <div className={classes.content__block} >
            <div className={classes.content}>
                    {props.children}
                    <div className={classes.blob}></div>
            </div>
        </div>
    )
}

export default ContentBlock