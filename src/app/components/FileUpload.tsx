'use client'
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import uploadIcon from '../assets/upload_file_svg.svg';
import { storage } from './configure';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Extroptions } from './Extroptions';
interface userProps {
  uid:number
}
const FileUpload: React.FC<userProps> = ({ uid }) => {
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(null);
  const useFileRef = useRef<HTMLInputElement>(null);
  const [showProgressBar, setBarVis] = useState<boolean>(false)
  const [showExtrOptions, setVisExtrOpt] = useState(false)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please select a PDF file.');
      }
    }
    setVisExtrOpt(true)
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setVisExtrOpt(true)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please drop a PDF file.');
      }
      setSelectedFile(file);
    }
    event.currentTarget.classList.remove('border-blue-500');
  };

  const handleFileSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    setVisExtrOpt(false)
    setBarVis(true)
    const storageRef = ref(storage, `${String(uid)}/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          setImgUrl(downloadURL)
          setBarVis(false);
          sendPdf(downloadURL)
        });
      }
    );

  }

  const sendPdf = async(docUrl:string) =>{
    await fetch("http://127.0.0.1:8000/", {
      method:'POST',
      body:JSON.stringify({docUrl:docUrl, pdf_type:"true"})
    })
  } 

  
  return (
    <>
    <form onSubmit={handleFileSubmit}>
    <div className="w-1/3 mx-auto h-40 border-2 shadow-lg border-dashed bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer mt-5"
      onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <input ref={useFileRef} type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
      <div className="mb-2">
        <Image onClick={() => { useFileRef.current?.click(); }} src={uploadIcon} className='mx-auto w-10 h-10' alt='Upload PDF' />
      </div>
      <div>
        {selectedFile ? (
          <p className="text-gray-600 text-lg">File Selected: {selectedFile.name}</p>
        ) : (
          <p className="text-gray-600 text-lg">Drag and Drop File or Click to Upload</p>
        )}
      </div>
      <div className='mt-3'>
      {
        !imgUrl && showProgressBar &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        /*<img src={imgUrl} alt='uploaded file' height={200} />*/
        <p>File Is Uploaded For Processing</p>
      }
      </div>
    </div>
    {showExtrOptions && <Extroptions/>}
    <div className="flex justify-center mt-2">
    <button type='submit' className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-10 rounded">Start Extracting!</button>  
    </div>  
      </form>
    </>
  );
};

export default FileUpload;
