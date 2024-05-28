import * as React from 'react';
import JSZip from 'jszip';
import { storage } from '../components/configure';
import { ref, getDownloadURL } from 'firebase/storage';
import ClientComponent from './Client';

interface Files {
  [key: string]: string;
}

export default async function HomeServer() {
  let images: Files | null = null;

  try {
    const fileRef = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/pdf-tool-dde90.appspot.com/o/107077698826747331387%2F723d0d45-eeb5-4ac5-ab74-ad948aa8c545%2Fimages.zip?alt=media&token=a7985079-f3b1-453b-946f-e2fb72a66b54');
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

    images = extractedImages;
  } catch (error) {
    console.error('Error extracting zip file:', error);
  }

  return (
    <div>
      <h1>Extract and Display Images</h1>
      <ClientComponent images={images} />
    </div>
  );
}
