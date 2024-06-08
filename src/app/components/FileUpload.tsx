"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, use } from "react";
import uploadIcon from "../assets/upload_file_svg.svg";
import { storage } from "./configure";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Extroptions } from "./Extroptions";
const { v4: uuidv4 } = require("uuid");
import Swal, { SweetAlertResult } from "sweetalert2";
import DisplayExtracted from "./DisplayExtracted";

interface userProps {
  uid: number;
}
const FileUpload: React.FC<userProps> = ({ uid }) => {

  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(null);
  const useFileRef = useRef<HTMLInputElement>(null);
  const [showProgressBar, setBarVis] = useState<boolean>(false);
  const [showExtrOptions, setVisExtrOpt] = useState(false);
  const [extrStart, setExtrStatus] = useState("");
  const [presUrl, setPresUrl] = useState("");
  const [processState, setProcessState] = useState("");
  const [extractedData, setExtractedData] = useState<any>()
  let projectName = "";

  let startPage = null;
  let endPage = null;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select a PDF file.");
      }
    }
    setVisExtrOpt(true);
  };

  const createProjectId = () => {
    // Generate unique id
    return uuidv4();
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setVisExtrOpt(true);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type !== "application/pdf") {
        alert("Please drop a PDF file.");
      }
      setSelectedFile(file);
    }
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    setVisExtrOpt(false);
    setBarVis(true);
    let projectId = createProjectId();
    //const storageRef = ref(storage, `${String(uid)}/${file.name}`);
    const storagePath = `${String(uid)}/${projectId}/input/${file.name}`;
    const storageRef = ref(
      storage,
      `${String(uid)}/${projectId}/input/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          getProjectName()
          console.log(downloadURL);
          setImgUrl(downloadURL);
          setBarVis(false);
          sendPdf(downloadURL, projectId, storagePath);
        });
      }
    );
  };

  //useEffect(() => {
  //  if (presUrl.length > 0) {
  //    setExtrStatus("completed");
  //  }
  //}, [presUrl]);
  const sendPdf = async (
    docUrl: string,
    projectId: string,
    docPath: string
  ) => {
    await getProjectName()
    let wholeExtract = "false"
    setExtrStatus("started");
    console.log(docUrl, projectId, docPath, startPage, endPage);
    if(startPage == 0 && endPage == 0){
      wholeExtract = "true"
    }
    await fetch("http://127.0.0.1:8000/api/upload/", {
      method: "POST",
      body: JSON.stringify({  
        project_name:projectName,
        whole_pdf_extract:wholeExtract,
        uid: uid,
        project_id: projectId,
        doc_url: docUrl,
        doc_path: docPath,
        pdf_type: "pdf",
        chapter_pages: [startPage, endPage],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
      //  return
        if (data.info.status == true) {
          setExtractedData(data.info.extracted_data)
          //getProjectName();
          setExtrStatus("completed")
          //sessionStorage.setItem("extracted", JSON.stringify(data.info.extracted_data))
          saveProjectName(projectId, projectName,data.info.extracted_data)
          window.location.href = `/extracted-preview?projectId=${projectId}`
        }
      });
  }

  function presentationPreview(projectId: number) {
    window.location.replace(`/preview?projectId=${projectId}`);
  }

  function saveProjectName(projectId:string, projectName:string, projectExtracted:any){
    let getCurrProjects = JSON.parse(localStorage.getItem("projects")) || []
    let nowProj = [...getCurrProjects, {projectId:projectId, projectName:projectName, projectExtracted:JSON.stringify(projectExtracted)}]
    localStorage.setItem("projects", JSON.stringify(nowProj))
  }

  async function getProjectName() {
    const result: SweetAlertResult = await Swal.fire({
      title: "Successfully extracted content",
      input: "text",
      icon: "success",
      inputLabel: "Enter Your Project Name",
      inputValue: "", // Set initial input value here
      showCancelButton: false,
      allowOutsideClick: false, // Prevent dismissing by clicking outside
      allowEscapeKey: false, // Prevent dismissing by pressing Escape key
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      confirmButtonText: "OK",
    });

    const { value: presentationName } = result;
    console.log(presentationName);
    //.then((data)=>{
    //  //console.log()
    //  if(data.isConfirmed){
    //    console.log(data.value)
    //  }
    //})

     projectName = presentationName;
  }
  return (
    <>
      <form onSubmit={handleFileSubmit}>
        <div
          className="w-1/3 mx-auto h-40 border-2 shadow-lg border-dashed bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer mt-5"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={useFileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <div className="mb-2">
            <Image
              onClick={() => {
                useFileRef.current?.click();
              }}
              src={uploadIcon}
              className="mx-auto w-10 h-10"
              alt="Upload PDF"
            />
          </div>
          <div>
            {selectedFile ? (
              <p className="text-gray-600 text-lg">
                File Selected: {selectedFile.name}
              </p>
            ) : (
              <p className="text-gray-600 text-lg">
                Drag and Drop File or Click to Upload
              </p>
            )}
          </div>
          <div className="mt-3">
            {!imgUrl && showProgressBar && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${progresspercent}%` }}
                >
                  {progresspercent}%
                </div>
              </div>
            )}
            {(imgUrl || extrStart) && (
              <div>
                {imgUrl && <p>File uploaded for processing</p>}
                {/*extrStart == "started" && <p>Extracting from content</p>*/}
                {extrStart == "completed" && (
                  <button>
                    <a href={presUrl}>Download Slides</a>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {showExtrOptions && (
          <Extroptions
            startPageVal={(val) => (startPage = val)}
            endPageVal={(val) => (endPage = val)}
          />
        )}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-10 rounded"
          >
            Start Extracting!
          </button>
        </div>
      </form>
      { extrStart == "completed" && <DisplayExtracted getText={extractedData}/>}
    </>
  );
};

export default FileUpload;
