import classes from './ButtonLoading.module.css'
import Loading from './../../../img/Loading.svg'

const ButtonLoading = () => {

    return(
        <button className={classes.loading__button}>
            <img className={classes.loading__rotate} src={Loading} alt='Loading'></img>
        </button>
    )
}

export default ButtonLoading