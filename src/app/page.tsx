'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import React, {useEffect} from 'react'
import FileUpload from "./components/FirebaseFileUpload";
import Footer from './components/Footer'
import uploadIcon from './assets/upload_file_svg.svg'
import downloadIcon from './assets/download.svg'
import AiLogo from './assets/ai-logo.svg'
import { Providers } from "./components/Providers";
import { useSession } from "next-auth/react";
import { SignInButton } from "./components/SignInButton";
export default function Home() {
  return (
  <>
  <Navbar />
  <Hero/>
  <div className="flex justify-center">
      <button className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-10 rounded">
        Get Started
      </button>
    </div>
    <section id="key-features-section"  className="p-8  mb-2">
      <h2 className=" text-center text-2xl font-medium mb-4">Key Features</h2>
      <div className="flex justify-around flex-col sm:flex-row ">
        <div className="text-center  sm:w-1/3 p-2">
          <svg className="mx-auto mb-2 w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          <h3 className="font-bold mb-2">Smart Extraction</h3>
          <p>Effortlessly extract questions from PDF documents</p>
        </div>
        <div className="text-center sm:w-1/3 p-2">
          <svg className="mx-auto mb-2 w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <h3 className="font-bold mb-2">Automated Analysis</h3>
          <p>Analyze content and generate insights automatically</p>
        </div>
        <div className="text-center sm:w-1/3 p-2">
          <svg className="mx-auto mb-2 w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <h3 className="font-bold mb-2">User-Friendly Interface</h3>
          <p>Intuitive design for easy navigation and usability</p>
        </div>
      </div>
    </section>

  <section id="key-features-section" className="p-5 mb-2">
    <h2 className="text-center text-2xl font-medium mb-4">Our Process</h2>
    <div className="flex justify-around flex-col sm:flex-row">
      <div className="text-center sm:w-1/3 p-2">
        <Image src={uploadIcon} alt="Upload" className="mx-auto mb-2 w-10 h-10"/>
        <p>Upload Your Document</p>
      </div>
      <div className="text-center sm:w-1/3 p-2">
        <Image src={AiLogo} alt="Upload" className="mx-auto mb-2 w-10 h-10"/>
        <p>AI Analyzes and Extracts Relevant Data</p>
      </div>
      <div className="text-center sm:w-1/3 p-2">
        <Image src={downloadIcon} alt="Upload" className="mx-auto mb-2 w-10 h-10"/>
        <p>Download Extracted Content and Embedded Images</p>
      </div>
    </div>
  </section>
  
  <h2 className="text-center font-medium text-2xl mb-4">Impact on Educating Instructors</h2>
  <section id="key-features-section" className="p-5 mb-8 rounded-lg bg-gradient-to-r shadow-2xl from-green-100 via-blue-100 to-white sm:w-2/3 mx-auto">
  <p className="text-gray-600 leading-relaxed">
  This product revolutionizes educator efficiency by automating the process of curating high-quality exercise questions.
  By seamlessly extracting questions from previous question papers and intelligently selecting top-tier queries, it empowers instructors to focus more on personalized teaching and student engagement.
   This innovative solution not only streamlines preparation but also cultivates a dynamic learning environment, fostering deeper understanding and academic success.
  </p>
  </section>

  <Footer/>
  </>
  );
}
