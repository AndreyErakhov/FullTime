import classes from './BtnColumns.module.css'
import ChangeColumns from './../../../../../img/BtnColumns.svg'


const BtnColumns = (props) => {
    return(
        <div className={classes.change}>
            <button className={classes.change__button} onClick={() => props.activeModal(true)}>
                <img src={ChangeColumns} alt='change'/>
                <p>Создать задачу</p>
            </button>
        </div>
    )
}

export default BtnColumns