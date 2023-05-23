import classes from './Cropper.module.css'
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import React, {useRef, useState} from 'react'
import AdminBlue from '../Content/BoardContent/img__admin/AdminBlue.svg'

const Cropper = (props) => {
    const filePicker = useRef([])
    const handlePick = (e) => {
        e.preventDefault()
        filePicker.current.click()
    } 
    const [crop, setCrop] = useState({aspect: 16 / 9})
    const [result , setResult] = useState(null)
    const setIMAGE = (e) => {
        e.preventDefault()
        setResult(props.src)
       
    }

    return(
        <div className={classes.cropper}>

            {
            // eslint-disable-next-line no-mixed-operators
            props.src && (
                <div className={classes.cropper__block}>
                    <ReactCrop className={classes.test} src={props.src}  onImageLoaded={props.setSelectedFile} crop={crop} onChange={setCrop} >
                        <img src={props.src} alt='src'/>
                    </ ReactCrop>
                </div>
                // eslint-disable-next-line no-mixed-operators
                ) || <img src={AdminBlue} width='68' alt='src'/>
            }
             
            
            {
            props.src 
            ? <button className='modal__btn-p' onClick={setIMAGE}><p>crop image</p></button>
            : <button className="modal__btn-p" onClick={handlePick}>
                    <p>Загрузите фото</p>
              </button>
            }
            
            <img src={result} alt="" width='68'/> 
           
                <input 
                className='hidden'
                onChange={props.onImageChange}
                accept = 'image/*,.png,.jpeg'
                ref={filePicker}
                type="file"
                />
                

        </div>
    )
}

export default Cropper