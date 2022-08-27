import { Button, makeStyles, Modal, Slider } from "@material-ui/core";
import React from "react";
import Cropper, { Area, MediaSize } from "react-easy-crop";
export const ASPECT_RATIO = 1 / 1;
export const CROP_WIDTH = 512;
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: 512,
    height: 512,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    borderRadius: "0px 0px 10px 10px",
    "& .crop-container": {
      height: 400,
      borderRadius: "10px 10px 0px 0px",
      backgroundColor: "#f4f7fb",
      position: "relative",
      "& .container": {},
      "& .crop-area": {
        border: "3px solid #00A0FF"
      },
      "& .media": {}
    },
    "& .controls": {
      height: 40,
      marginLeft: 50,
      marginRight: 50,
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      "& .zoom-range": {
        color: "#00A0FF"
      }
    },
    "& .buttons": {
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight: 90,
      marginLeft: 90,
      marginBottom: 10,
      "& .close": {
        backgroundColor: "gray",
        color: "#fff"
      },
      "& .ok": {
        backgroundColor: "#00A0FF",
        color: "#fff"
      }
    }
  }
});
type Props = {
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  showCroppedImage: () => void;
  onMediaLoaded: (mediaSize: MediaSize) => void;
  minZoom: number;
};
const CropperModal: React.FC<Props> = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  open,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.modal}>
        <div className="crop-container">
          <div className="crop-space">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              maxZoom={minZoom + 3}
              aspect={ASPECT_RATIO}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{
                width: CROP_WIDTH,
                height: CROP_WIDTH / ASPECT_RATIO
              }}
              classes={{
                containerClassName: "container",
                cropAreaClassName: "crop-area",
                mediaClassName: "media"
              }}
              onMediaLoaded={onMediaLoaded}
              showGrid={false}
            />
          </div>
        </div>
        <div className="controls">
          <Slider
            min={minZoom}
            value={zoom}
            max={minZoom + 3}
            step={0.1}
            onChange={(e, value) => {
              if (typeof value === "number") {
                setZoom(value);
              }
            }}
            className="zoom-range"
          />
        </div>
        <div className="buttons">
          <Button className="close" onClick={onClose}>
            Close
          </Button>
          <Button
            className="ok"
            onClick={() => {
              onClose();
              showCroppedImage();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CropperModal;
