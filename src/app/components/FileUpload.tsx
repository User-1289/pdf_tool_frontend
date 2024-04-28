'use client'

import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
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
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
    event.currentTarget.classList.add('border-blue-500');

  };

  return (
<div className="w-1/2 mx-auto h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer mt-5"
         onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <input type="file" className="hidden" onChange={handleFileChange} />
      {selectedFile ? (
        <p className="text-gray-600 text-lg">File Selected: {selectedFile.name}</p>
      ) : (
        <p className="text-gray-600 text-lg">Drag and Drop File or Click to Upload</p>
      )}
    </div>
  );
};

export default FileUpload;
