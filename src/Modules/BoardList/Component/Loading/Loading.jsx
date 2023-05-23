import classes from './Loading.module.css'
import loading from './../../../BoardList/Component/Form/img/Loading.svg'
const Loading = (props) => {
    return(
        <div className={ props.postsLoading ? `${classes.modal__loading} ${classes.active}` : classes.modal__loading}>
                <div className={classes.box__loading}>
                    <img src={loading} alt="Loading" />
                    <p>Загрузка</p>
                </div>
        </div>
    )
}

export default Loading