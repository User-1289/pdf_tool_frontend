'use client'
import React,{useState, useEffect} from 'react';
import { Providers } from '../components/Providers';
import { SignInButton } from '../components/SignInButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import FileUpload from '../components/FileUpload';
import DisplayProjects from '../components/DisplayProjects';
import { getLocalProjects } from '../lib/retrieveLocal';
export default function Page() {
  const [userId, setUserId] = useState()
  const [existingProjects, setExistingProjects] = useState([])
  useEffect(()=>{
    let getProjects = getLocalProjects()

    if(getProjects!=null || getProjects.length>0){
      setExistingProjects(getProjects)
    }
    //let getProjects = JSON.parse(localStorage.getItem("projects"))
  }, [])
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
      <DisplayProjects uid={userId} allProjects={existingProjects}/>
    </div>
  );
}
