import React, {useRef, useState} from 'react'

const FileUploader = (props:{onFileSelectError:any, onFileSelectSuccess:any}) => {
    const {onFileSelectError, onFileSelectSuccess} = props;
    const fileInput = useRef<any>(null)
    const [fileURL, setFileURL] = useState<any>(null);
    
    const handleFileInput = (e:any) => {
        const file = e.target.files[0];
        setFileURL(URL.createObjectURL(e.target.files[0]));
        if (!isImage(file.name)) {
            onFileSelectError("Please upload file having extensions .jpeg/.jpg/.png/.gif only.");
          }    

        if (file.size > 1024*1024)
            onFileSelectError("File size cannot exceed more than 1MB");
        else onFileSelectSuccess(file);
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}  accept=".jpg, .jpeg, .png, .gif," className="my-1 block rounded-lg w-full text-sm bg-white text-gray-900 border-2 border-[#999999] p-[5px] outline-none focus:border-red-400 text-sm text-gray-700 leading-tight"/>
            <p className="text-sm text-white " id="file_input_help">SVG, PNG, JPG or GIF (MAX. SIZE 1MB).</p>
            {fileURL && (<img src={fileURL} className="my-2 max-h-[200px] mx-auto"/>
            )}
        </div>
    )
}

export default FileUploader;

function isImage(fileName:string) {
    const ext = ['.jpg', '.jpeg', '.gif', '.png','.JPG','.svg','.JPEG', '.GIF', '.PNG','.SVG'];
    return ext.some(el => fileName.endsWith(el));
  }
  
  