import classes from './BtnChange.module.css'
import ChangeColumns from './../../../../../img/ChangeColumns.svg'
import BtnColumns from '../BtnColumns/BtnColumns'


const BtnChange = (props) => {

    return(
        <div className={classes.change}>
            {props.columns.length 
            ?<BtnColumns activeModal={props.activeModal}/>
            :<button></button>
            }
            <button className={classes.change__button} onClick={props.activeContentAddColumn}>
                <img src={ChangeColumns} alt='change'/>
                <p>Изменить столбцы</p>
            </button>
        </div>
    )
}

export default BtnChange
