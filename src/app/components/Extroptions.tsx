'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import CustomShit from './CustomShit';
import Info from '../assets/info.svg'
export const Extroptions = () => {
  const [showPageOpt, setShowPageOpt] = useState(false);

  return (
    <div className='mx-auto flex flex-col justify-start items-start border-2 w-1/3 p-2'>
      <h3>Where do you want to extract questions from</h3>
      <div className='flex items-center justify-end p-3'>
        <label>
          <input onClick={() => setShowPageOpt(false)} name='select-type' type='radio' />
          <span className='pl-2'>Whole PDF</span>
        </label>
      </div>
      <div className='flex items-center justify-end p-3'>
        <label>
          <input onClick={() => setShowPageOpt(true)} name='select-type' type='radio' />
          <span className='pl-2'>From Certain Content</span>
        </label>
      </div>
      {showPageOpt && 
      <>
        <div className='flex justify-center mt-2'>
          <div className='text-lg font-medium '>Select Pages</div>
          <button className='hover:text-gray-400'>
            <Image src={Info} alt='Info'/>
            </button>
        </div>
        <div className='flex items-center justify-end p-2'>
            <input className='shadow-lg p-2 rounded-lg' type='text' placeholder='Enter starting page number'/>
        </div>
        <div className='flex items-center justify-end p-2'>
            <input className='shadow-lg p-2 rounded-lg' type='text' placeholder='Enter ending page number'/>
        </div>
        </>
      }
      <div></div>
    </div>
  );
};

