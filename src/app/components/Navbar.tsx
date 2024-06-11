'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import menuImg from '../assets/menu.svg'
import { Providers } from './Providers'
import { SignInButton } from './SignInButton'
export default function Navbar() {
  const[userId, setUserId] = useState("")
  
  const goToDashboard = () =>{
    if(userId.length>0){
      window.location.href = "/dashboard"
    }
  }
  return (
    <header className="bg-white shadow">
    <nav className="container mx-auto flex justify-end items-center p-4 2xl:mr-10">
      <button id="disclosure-button" className="sm:hidden">
        <Image src={menuImg} alt="Menu" className="mx-auto mb-2 w-10 h-10"/>
      </button>
      <ul className=" hidden sm:flex sm:space-x-5 2xl:space-x-10">
        <li><a onClick={() => {goToDashboard()}} href="#" className=" text-gray-500 hover:text-black">Dashboard</a></li>
        <li><a href="#" className=" text-gray-500 hover:text-black">Features</a></li>
        <li><a href="#" className=" text-gray-500 hover:text-black">How It Works</a></li>
        <li><a href="#" className=" text-gray-500 hover:text-black">Pricing</a></li>
        <li><a href="#" className=" text-gray-500 hover:text-black">Contact</a></li>
        <Providers>
        <SignInButton uid={id => setUserId(String(id) || "")}/>
        </Providers>
        {/*<li><a href="#" className=" text-gray-500 hover:text-black">Login</a></li>*/}
      </ul>
    </nav>
  </header>  
  )
}
