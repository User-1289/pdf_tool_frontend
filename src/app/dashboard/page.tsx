'use client'
import React,{useState, useEffect} from 'react';
import { Providers } from '../components/Providers';
import { SignInButton } from '../components/SignInButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import FileUpload from '../components/FileUpload';

export default function Page() {
  const [userId, setUserId] = useState()

  useEffect(()=>{
    console.log(userId)
  }, [userId])


  return (
    <div>
      <header className="bg-white shadow">
        <nav className="container mx-auto flex justify-end items-center p-4 2xl:mr-10">
        <h3 className='absolute left-2 font-medium text-lg'>PDF Question Extractor</h3>
          <Providers>
            <SignInButton uid={id => setUserId(id)}/>
          </Providers>
        </nav>
      </header>  
      <FileUpload uid={userId}/>
    </div>
  );
}
