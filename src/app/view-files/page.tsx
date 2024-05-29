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
    const fileRef = ref(storage, 'gs://pdf-tool-dde90.appspot.com/115887270922889725754/5a3819aa-8f02-4d08-b84c-4bbb0c57f9ee/images.zip');
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
