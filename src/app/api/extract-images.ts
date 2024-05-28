// pages/api/extract-zip.ts
import { NextApiRequest, NextApiResponse } from 'next';
import JSZip from 'jszip';
import {storage,  } from '../components/configure';
import { getDownloadURL, ref } from 'firebase/storage';
const getMimeType = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filePath } = req.query;

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ error: 'No file path provided' });
  }

  try {
    const fileRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(fileRef);
    const response = await fetch(downloadURL);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const files: { [key: string]: string } = {};

    for (const filename of Object.keys(zip.files)) {
      const fileData = await zip.file(filename)?.async('uint8array');
      if (fileData) {
        const base64String = Buffer.from(fileData).toString('base64');
        const mimeType = getMimeType(filename);
        files[filename] = `data:${mimeType};base64,${base64String}`;
      }
    }

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to extract zip file' });
  }
}
