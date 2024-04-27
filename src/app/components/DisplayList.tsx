import React from 'react';
import { PythonShell } from 'python-shell';
const { spawn } = require('child_process');
const path = require('path');

let options = {
  scriptPath: '../pyscripts',
};

export default function DisplayList() {
  const pythonPath = path.join(__dirname, 'C:\Users\armaa\AppData\Local\Programs\Python\Python312\Scripts');

  const executePythonScript = (scriptPath, args = []) => {
    console.log('hey')
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn(pythonPath, [scriptPath, ...args]);
  
      let output = '';
      let error = '';
  
      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });
  
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Python script exited with code ${code}\n${error}`);
        }
      });
    });
  };
  
  // Example usage: Execute a Python script
  const scriptPath = path.join(__dirname, '../pyscripts/test.py');
  const scriptArgs = ['arg1', 'arg2']; // Optional script arguments
  
  executePythonScript(scriptPath, scriptArgs)
    .then((output) => {
      console.log('Python script output:', output);
      // Do something with the output
    })
    .catch((error) => {
      console.error('Error executing Python script:', error);
    });

  return (
    <section id="key-features-section"  className="p-8 mb-8  ">
      <h2 className=" text-center text-2xl font-bold mb-4">Key Features</h2>
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
    )
}
