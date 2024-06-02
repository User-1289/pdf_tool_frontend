import React, { useState } from 'react';
import Image from 'next/image';
import edit from '../assets/edit_black.svg';
import del from '../assets/delete.svg';
import more from '../assets/more.svg';
import {DownloadQuestions} from '../components/DownloadQuestions'
export default function DisplayProjects({ allProjects }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
      {allProjects.map((project, i) => (
        <DisplayEach key={i} project={project} />
      ))}
    </div>
  );
}

export const DisplayEach: React.FC<{ project: any }> = ({ project }) => {
  const [drpVis, setDrpVis] = useState(false);

  function editQuestions(){
    window.open("/extracted-preview?projectId=" + project.projectId, "_blank");
  }
  return (
    <div className='relative bg-white flex flex-col justify-between p-4 rounded-xl shadow-lg' style={{ background: 'linear-gradient(to bottom right, #f0f4f8, #e0ffe0)' }}>
      <div className='flex justify-between items-start mb-4'>
        <h1 className='text-2xl font-semibold text-center w-full'>{project.projectName}</h1>
        <button onClick={() => setDrpVis(!drpVis)} className='ml-4 relative transition-transform transform hover:scale-110 hover:shadow-lg'>
          <Image src={more} alt="More" className='w-6 h-6' />
        </button>
      </div>
      {drpVis &&
        <div onClick={() => {setDrpVis(!drpVis)}} className='absolute z-50 top-8 right-0 mt-2 bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-lg min-w-[160px] transition-all duration-300 ease-in-out'>
          <section className='flex justify-between items-center w-full mb-3 p-2 hover:bg-gray-300 rounded-lg cursor-pointer transition-all duration-200 ease-in-out'>
            <span className='text-gray-800 font-semibold'>Edit</span>
            <Image onClick={()=>{editQuestions()}} src={edit} alt="Edit" className='w-6 h-6' />
          </section>
          <section className='flex justify-between items-center w-full p-2 hover:bg-gray-300 rounded-lg cursor-pointer transition-all duration-200 ease-in-out'>
            <span className='text-gray-800 font-semibold' >Delete</span>
            <Image src={del} alt="Delete" className='w-6 h-6' />
          </section>
        </div>
      }
      <div className='flex flex-col items-center mb-1'>
        <DownloadQuestions project={project} />
      </div>
    </div>
  );
};

