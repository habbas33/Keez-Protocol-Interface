import React, {useRef, useState, useCallback} from 'react'

import { Area, MediaSize } from "react-easy-crop";
import CropperModal from "../../modals/CropperModal";
import getCroppedImg from "../../utils/getCroppedImg";
export const ASPECT_RATIO = 1 / 1;
export const CROP_WIDTH = 512;

const FileUploader = (props:{onFileSelectError:any, onFileSelectSuccess:any}) => {
    const {onFileSelectError, onFileSelectSuccess} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [zoom, setZoom] = useState(1);
    const [minZoom, setMinZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [croppedImgSrc, setCroppedImgSrc] = useState("");

    const onFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            if (!isImage(file.name)) {
                onFileSelectError("Please upload file having extensions .jpeg/.jpg/.png/.gif only.");
            } else if (file.size > 1024*1024) {
                onFileSelectError("File size cannot exceed more than 1MB");
            } else {
                reader.addEventListener("load", () => {
                if (reader.result) {
                    setImgSrc(reader.result.toString() || "");
                    setIsOpen(true);
                }
                });
                reader.readAsDataURL(e.target.files[0]);
            }
          }
        },
        []
      );

    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
          const result = CROP_WIDTH / ASPECT_RATIO / height;
          setZoom(result);
          setMinZoom(result);
          return;
        }
        const result = CROP_WIDTH / width;
        setZoom(result);
        setMinZoom(result);
      }, []);

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
          setCroppedAreaPixels(croppedAreaPixels);
        },
        []
      );

    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        try {
          const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
          setCroppedImgSrc(URL.createObjectURL(croppedImage));
          onFileSelectSuccess(croppedImage);
          // console.log("croppedImgSrc",croppedImage);
        } catch (e) {
          console.error(e);
        }
      }, [croppedAreaPixels, imgSrc]);

    return (
        <div className="file-uploader">
           <input type="file" onChange={onFileChange}  accept=".jpg, .jpeg, .png, .gif," className="my-1 block rounded-lg w-full text-sm bg-white text-gray-900 border-2 border-[#999999] p-[5px] outline-none focus:border-red-400 text-sm text-gray-700 leading-tight"/>
            <p className="text-xs text-gray-100" id="file_input_help">SVG, PNG, JPG or GIF (MAX. SIZE 1MB).</p>
            <div className="img-container">
                {croppedImgSrc && (
                <img src={croppedImgSrc} alt="Cropped" className="my-2 max-h-[200px] mx-auto" />
                ) }
            </div>

            <CropperModal
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                imgSrc={imgSrc}
                showCroppedImage={showCroppedImage}
                onMediaLoaded={onMediaLoaded}
                minZoom={minZoom}
            />
        </div>
    )
}

export default FileUploader;

function isImage(fileName:string) {
    const ext = ['.jpg', '.jpeg', '.gif', '.png','.JPG','.svg','.JPEG', '.GIF', '.PNG','.SVG'];
    return ext.some(el => fileName.endsWith(el));
  }
  
  
