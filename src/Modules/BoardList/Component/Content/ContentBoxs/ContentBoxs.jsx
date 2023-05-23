import classes from './ContentBoxs.module.css'

const ContentBoxs = () => {

    return(
        <div className={classes.content__box}>
            <div className={classes.content__border}>
                <div className={classes.content__boards}>
                    <p>Название</p>
                    <p>Дата</p>
                    <p>Администратор</p>
                </div>
            </div>
        </div>
    )
}

export default ContentBoxs