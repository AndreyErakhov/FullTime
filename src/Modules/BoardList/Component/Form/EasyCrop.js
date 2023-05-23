import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import classes from './Form.module.css'



const EasyCrop = ({ image,picture, croppedImage, setCroppedImage }) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

   const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      picture(croppedImage)
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, rotation, setCroppedImage, picture]);

  return (
    <div>
      <button className={classes.button__cropped} style={{ display: image === null || croppedImage !== null ? "none" : "block"}} onClick={showCroppedImage}>
        Добавить
      </button>
      <div
        className={classes.container}
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className={classes.crop__container}>
            <Cropper
            className={classes.reactEasyCrop_Container2}
            image={image}
            crop={crop}
            rotation={rotation}
            showGrid={true}
            aspect={5 / 5}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onRotationChange={setRotation}
            cropShape="round"
          />
        </div>
      </div>
      <div className={classes.cropped__image_container}>
        {croppedImage && (
          <img className={classes.cropped__image} src={croppedImage} alt="cropped" />
        )}
      </div>
    </div>
  );
};

export default EasyCrop;