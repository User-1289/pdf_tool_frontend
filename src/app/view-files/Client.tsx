'use client';

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
          <h2>Extracted Images:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.entries(images).map(([filename, base64String]) => (
              <div key={filename} style={{ margin: 10 }}>
                <img src={base64String} alt={filename} style={{ maxWidth: '200px' }} />
                <p>{filename}</p>
                <a href={base64String} download={filename}>
                  <button>Download</button>
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
