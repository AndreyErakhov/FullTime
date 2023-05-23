/* eslint-disable jsx-a11y/alt-text */
import React, {  useState, useEffect,} from "react";
// import "./Form.css"
import EasyCrop from "./EasyCrop";
import ModalExit from "./../../../../img/modalExit.svg"
import MyButton from "./Ul/Button/MyButton";
import MyInput from "./Ul/Input/MyInput";
import globalService from "../../../../API/PostService";
import Loading from './img/Loading.svg'
import Avatar from './img/AvatarDesk.svg'
import classes from './Form.module.css'

const Form = ({create, active, setActive,}) => {
    

    const [title, setTitle] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)// хронятся выбранные файлы на фронтенде
    const [checkInputValue, setCheckInputValue] = useState(false)
    const [postsLoading, setPostsLoading] = useState(false)
    const [completeImg, setCompleteImg] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect( () => {
        if(title === ''){
            setCheckInputValue(false)
        }else {
            setCheckInputValue(true)
        }
    },[title])
   
    function onImageChange(e) {
        setSelectedFile(null)
        setCroppedImage(null)
        setCompleteImg(null)
        setSelectedFile(URL.createObjectURL( e.target.files[0]) )
    }

    async function pictureProcess(pic) {
        let blob = await fetch(pic).then((r) => r.blob()); 
        const myFile = new File([blob], 'image', {
            type: blob.type,
        });
        setCompleteImg(myFile)
      }


      const addNewPost = (e) => {
  
        e.preventDefault()
        setPostsLoading(true)
        const formData =  new FormData();
        formData.append('title', title);
        formData.append('file', completeImg);
       
          
    const createReqest = async (formData) => { 
        const postsRequest = await globalService('createBoard',formData);
        if(postsRequest[0] === 'complete'){
            create(postsRequest[1])
        }
        setPostsLoading(false)
        setSelectedFile(null)
        setCroppedImage(null)
        setCompleteImg(null)
        setTitle('')
        }
       return createReqest(formData) 
    }
    

    return(
        <div className={active ? `${classes.modal} ${classes.active}` : classes.modal } onClick={() => setActive(false)}>
            <div className= {classes.modal__content} onClick = { e => e.stopPropagation()}>
                <div className= {classes.modal__box}>
                    <div className={classes.modal__text}>
                            <p>Создать доску</p>
                    </div>
                    
                        {selectedFile 
                        ? <EasyCrop croppedImage={croppedImage} setCroppedImage={setCroppedImage} completeImg={completeImg}  picture={pictureProcess} image={selectedFile}  />
                        : <img src={Avatar} alt="avatar" />
                        }
                        <button className={classes.modal__btm_img} onClick={() => setActive(false)}>
                            <img src={ModalExit}/>
                        </button>
                        <form onSubmit={addNewPost}>

                        
                        <label className={classes.label__text}>
                        <p>Загрузите фото</p> 
                        <input
                            type="file"
                            name="cover"
                            onChange={onImageChange}
                            onClick={(event)=> { 
                                event.target.value = null
                            }}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        </label>
                        <MyInput 
                            name="text" 
                            autoComplete="off"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            type='text'
                        />
                        
                        {postsLoading
                            ? <button className={classes.modal__btn}>
                                <img className={classes.rotate} src={Loading}/>
                              </button>
                            : <MyButton onClick={addNewPost} disabled={!checkInputValue} className={title ? classes.active__btn : classes.modal__btn}/>
                        }
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Form ;