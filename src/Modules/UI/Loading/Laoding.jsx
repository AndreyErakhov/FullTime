import classes from './Laoding.module.css'
import laoding from './../../../BoardList/Component/Form/img/Laoding.svg'
const Laoding = (props) => {
    return(
        <div className={ props.postsLoading ? `${classes.modal__laoding} ${classes.active}` : classes.modal__laoding}>
                <div className={classes.box__laoding}>
                    <img src={laoding} alt="Laoding" />
                    <p>Загрузка</p>
                </div>
        </div>
    )
}

export default Laoding