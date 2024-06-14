'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import menuImg from '../assets/menu.svg'
import { Providers } from './Providers'
import { SignInButton } from './SignInButton'
import { Sign } from 'crypto'

export default function Navbar() {
  const [userId, setUserId] = useState("")
  const [mobNavVis, setMobNavVis] = useState(false)
  const goToDashboard = () => {
    if (userId.length > 0) {
      window.location.href = "/dashboard"
    }
  }

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex sm:justify-end items-center p-3 2xl:mr-10">
      <div className="flex justify-between items-center w-full sm:hidden z-50">
  <button id="disclosure-button">
    <Image onClick={() => {setMobNavVis(!mobNavVis)}} src={menuImg} alt="Menu" className="w-7 h-7" />
  </button>
  <span className=''>
    <Providers>
      <SignInButton uid={id => setUserId(String(id) || "")} />
    </Providers>
  </span>
</div>

        <ul className=" hidden sm:flex sm:space-x-5 2xl:space-x-10">
          <li><a onClick={() => { goToDashboard() }} href="#" className=" text-gray-500 hover:text-black">Dashboard</a></li>
          <li><a href="#" className=" text-gray-500 hover:text-black">Features</a></li>
          <li><a href="#" className=" text-gray-500 hover:text-black">How It Works</a></li>
          <li><a href="#" className=" text-gray-500 hover:text-black">Pricing</a></li>
          <li><a href="#" className=" text-gray-500 hover:text-black">Contact</a></li>
          <Providers>
            <SignInButton uid={id => setUserId(String(id) || "")} />
          </Providers>
        </ul>
        {mobNavVis &&
          <div className='sm:hidden fixed top-0 left-0 w-full bg-gray-200 z-40 pt-10'>
            
            <ul className="">
              <li className='p-1 mt-1  px-4 text-lg font-medium'><a onClick={() => { goToDashboard() }} href="#" className=" text-gray-500 hover:text-black">Dashboard</a></li>
              <li className='p-1 mt-1  px-4 text-lg font-medium'><a href="#" className=" text-gray-500 hover:text-black">Features</a></li>
              <li className='p-1 mt-1  px-4 text-lg font-medium'><a href="#" className=" text-gray-500 hover:text-black">How It Works</a></li>
              <li className='p-1 mt-1  px-4 text-lg font-medium'><a href="#" className=" text-gray-500 hover:text-black">Pricing</a></li>
              <li className='p-1 mt-1  px-4 text-lg font-medium'><a href="#" className=" text-gray-500 hover:text-black">Contact</a></li>
            </ul>
          </div>}
      </nav>
    </header>
  )
}
