'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { storage } from '../components/configure';
import { ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import downloadIcon from '../assets/download.svg'
interface Files {
  [key: string]: string;
}

interface ClientComponentProps {
  images: Files | null;
  onDownloadZip: () => void; // Function to handle zip download
}

function ClientComponent({ images, onDownloadZip }: ClientComponentProps) {
  return (
    <div>
      {images ? (
        <div>
<div className='flex justify-center items-center h-full'>
  <button onClick={onDownloadZip} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Download All as ZIP</button>
</div>

          <div className="flex flex-wrap">
            {Object.entries(images).map(([filename, base64String]) => (
              <div key={filename} className="m-4 flex flex-col items-center">
                <img
                  src={base64String}
                  alt={filename}
                  className="w-32 h-32 object-cover mb-2"
                />
                {/*<p className="text-center">{filename}</p>*/}
                <a href={base64String} download={filename}>
                <Image src={downloadIcon} alt='download'/>
                  {/*<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download
                  </button>*/}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No images extracted</p>
      )}
    </div>
  );
}

const HomeClient = ({uid, projectId}) => {
  console.log(uid, projectId)
  const [images, setImages] = useState<Files | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndExtractImages = async () => {
      try {
        const fileRef = ref(storage, `gs://pdf-tool-dde90.appspot.com/${uid}/${projectId}/images.zip`);
        //const fileRef = ref(storage, 'gs://pdf-tool-dde90.appspot.com/107077698826747331387/5474ec79-d651-4e1a-8128-6b6c81a1e576/images.zip');
        const downloadURL = await getDownloadURL(fileRef);
        const response = await fetch(downloadURL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const extractedImages: Files = {};

        for (const filename of Object.keys(zip.files)) {
          const fileData = await zip.file(filename)?.async('base64');
          if (fileData) {
            extractedImages[filename] = `data:image/jpeg;base64,${fileData}`;
          }
        }

        setImages(extractedImages);
      } catch (error) {
        console.error('Error extracting zip file:', error);
        setError('Failed to extract images');
      } finally {
        setLoading(false);
      }
    };

    fetchAndExtractImages();
  }, [uid,projectId]);

  const handleDownloadZip = async () => {
    try {
      if (!images) return;

      const zip = new JSZip();

      for (const [filename, base64String] of Object.entries(images)) {
        zip.file(filename, base64String.split(';base64,')[1], { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = zipUrl;
      link.setAttribute('download', 'extracted_images.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating zip file:', error);
      setError('Failed to generate zip file');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
     <ClientComponent images={images} onDownloadZip={handleDownloadZip} />
    </div>
  );
};

export default HomeClient;
