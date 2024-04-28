import React from 'react';
import { Providers } from '../components/Providers';
import { SignInButton } from '../components/SignInButton';
import FileUpload from '../components/FileUpload';
export default function Page() {
  return (
    <div>
      <header className="bg-white shadow">
        <nav className="container mx-auto flex justify-end items-center p-4 2xl:mr-10">
          <Providers>
            <SignInButton />
          </Providers>
        </nav>
      </header>  
      <FileUpload/>
    </div>
  );
}
