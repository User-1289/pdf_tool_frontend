'use client'
import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { LuFileType } from 'react-icons/lu';

export default function page() {

  const docs = [
    { uri: "https://firebasestorage.googleapis.com/v0/b/pdf-tool-dde90.appspot.com/o/extracted_slides.pptx?alt=media&token=7f5ab2ac-bb95-41f3-bb3e-40ad3c6961f3" ,
      fileType: "pptx",
      //fileName:"test.pptx"
    }, // Remote file
    
   // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];
  return (
    <div>
      <center>
        <DocViewer style={{height:'100vh', width:'80vw'}} className='w-1/4 ' documents={docs} pluginRenderers={DocViewerRenderers} />;
        </center>
    </div>
  )
}
