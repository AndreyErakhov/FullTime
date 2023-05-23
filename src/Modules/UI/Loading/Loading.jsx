import classes from './Loading.module.css'
import laoding from './../../../img/Loading.svg'

const Loading = (props) => {
    return(
        <div className={ props.requestLoading ? `${classes.modal__laoding} ${classes.active}` : classes.modal__laoding}>
                <div className={classes.box__laoding}>
                    <img src={laoding} alt="Loading" />
                    <p>Загрузка</p>
                </div>
        </div>
    )
}

export default Loading
