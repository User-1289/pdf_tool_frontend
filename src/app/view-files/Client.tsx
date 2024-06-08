import * as React from 'react';

interface Files {
  [key: string]: string;
}

interface ClientComponentProps {
  images: Files | null;

}

export default function ClientComponent({ images }: ClientComponentProps) {
  
  return (
    <div>
      {images ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Extracted Images:</h2>
          <div className="flex flex-wrap">
            {Object.entries(images).map(([filename, base64String]) => (
              <div key={filename} className="m-4 flex flex-col items-center">
                <img
                  src={base64String}
                  alt={filename}
                  className="w-32 h-32 object-cover mb-2"
                />
                <p className="text-center">{filename}</p>
                <a href={base64String} download={filename}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download
                  </button>
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
