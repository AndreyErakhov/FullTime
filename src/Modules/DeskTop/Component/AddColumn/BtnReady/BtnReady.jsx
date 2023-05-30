import classes from './BtnReady.module.css'
import Ready from './../img/Ready.svg'

const BtnReady = (props) => {
    return(
        <div className={classes.ready__block}>
            <button className={classes.ready__btn} onClick={props.activeContentColumns}>
                <img src={Ready} alt='ready'/>
                <p>Готово</p>
            </button>
        </div>
    )
}

export default BtnReady