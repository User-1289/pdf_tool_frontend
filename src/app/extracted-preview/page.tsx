'use client'
import HomeServer from "../view-files/page"
import React, { use, useEffect, useState } from 'react';
import downloadIcon from '../assets/download.svg'
import Image from "next/image";
import expandIcon from '../assets/expand.svg'
interface Question {
    Question: string;
    answer: string;
}

interface Project {
    projectId:string,
    projectName:string,
}
interface Category {
    category_name: string;
    Questions: Question[];
}

interface Chapter {
    chapter_name: string;
    Categories: Category[];
}

interface ExtractedText {
    chapters: Chapter[];
}

interface DisplayExtractedProps {
    getText: ExtractedText;
}

interface DisplayTextProps {
    categoryQuestions: Category;
    updateText:boolean,
    projectDetails:object
}

const DisplayText: React.FC<DisplayTextProps> = ({ categoryQuestions, updateText, projectDetails }) => {

    const [contentData, setContent] = useState(categoryQuestions)
    let getContent = categoryQuestions
    function updateContent(i:number, typeOfUpdate:string, content:string){
        let getData = contentData
        getData[i].typeOfUpdate = content
        setContent(getData)
    }
    function saveContent(projDetails:Project){
        return
        console.log(projDetails)
        let mergeObjects = []
        mergeObjects.push(getContent)
        let setObj = {projectName:projDetails.projectName, projectId:projDetails.projectId, projectExtracted:mergeObjects}
        localStorage.setItem(projDetails.projectId, JSON.stringify(setObj))

        console.log(mergeObjects)
    }
    //useEffect(()=>{
    //    //console.log(updateText)
    //    if(updateText==true){
    //        saveContent({projectId:projectDetails.projectId, projectName:projectDetails.projectName})
    //        //console.log(categoryQuestions)
    //    }
    //}, [updateText])
    return (
        <div className="border p-4 rounded-lg shadow-lg mb-4">
            <h2 
              //onInput={(e) => { getContent.category_name = e.target.innerText; console.log(getContent.category_name) }} 
            contentEditable="true" className="text-xl font-bold mb-2 text-gray-700">{categoryQuestions.category_name}</h2>
            <details className="bg-gray-100 p-2 rounded">
                <summary className="cursor-pointer text-gray-600">Show Questions</summary>
                <div className="mt-2 space-y-4">
                    {categoryQuestions.Questions.map((question, i) => (
                        <div key={i} className="p-2 bg-white border rounded">
                            <h3 
                        //onInput={(e) => {getContent.Questions[i].Question = e.target.innerText;}} 
                        contentEditable="true"  className="text-lg font-semibold text-gray-800">{question.Question}</h3>
                            {question.answer !=null && <h4
                         //   onInput={(e) => {getContent.Questions[i].answer = e.target.innerText;}} 
                            contentEditable="true"  className="text-gray-600">{question.answer}</h4>}
                        </div>
                    ))}
                </div>
            </details>
        </div>
    );
};


//const DisplayExtracted: React.FC<DisplayExtractedProps> = ({  }) => {
const DisplayExtracted = () => {
    function makeIndiv(){
        let getAllProj = JSON.parse(localStorage.getItem("projects"))
        getAllProj.map((item,i)=>{
            item.projectExtracted = JSON.parse(item.projectExtracted)
        })
        getAllProj.map((proj,i)=>{
            localStorage.setItem(proj.projectId, JSON.stringify(proj))
        })
    }

    //useEffect(()=>{
    //    makeIndiv()
    //}, [])
  const [extractedText, setExtractedText] = useState([])
  const [shouldSave, setShouldSave] = useState(false)
  const [projDetails, setDetails] = useState({})
  //const urlParams = new URLSearchParams(window.location.search);
  //const projectIdFromParams = urlParams.get('projectId');

  /*useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectIdFromParams = urlParams.get('projectId');
    let getAllData = JSON.parse(localStorage.getItem("projects"))

    let getSpecificProjIndex = getAllData.findIndex(item => item.projectId === projectIdFromParams)
    //console.log(getAllData)
    //console.log(getAllData[getSpecificProjIndex])
    let getJsonString = JSON.parse(getAllData[getSpecificProjIndex].projectExtracted)
    console.log(getJsonString)
    let getExtractedText = [...getJsonString]
    setExtractedText(getExtractedText)
    console.log(extractedText)
  }, [])*/
  
  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectIdFromParams = urlParams.get('projectId');
    let getProjDetails = JSON.parse(localStorage.getItem(projectIdFromParams))
    console.log(getProjDetails)
    setDetails({projectName:getProjDetails.projectName, projectId:getProjDetails.projectId})
    setExtractedText(getProjDetails.projectExtracted)
  }, [])

    //extractedText = extractedText.findIndex
  

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className='text-center text-xl font-bold'>Extracted Content</h1>
            {/*<details>
                <summary className='text-lg font-medium mb-3 cursor-pointer '>
                Extracted Images
                </summary>
                <HomeServer uid={"107077698826747331387"} projectId={projectIdFromParams} />
            </details>*/}
            <details open>
            <summary className='text-lg font-medium mb-3 cursor-pointer '>
                Extracted Text
            </summary>
            <section className='p-2'>
            {extractedText.map((chapter, i) => (
                <div key={i} className="mb-8">
                    <h1  contentEditable="true"  className="text-xl font-bold mb-4 text-blue-700">{chapter.chapter_name}</h1>
                    {chapter.Categories.map((category, j) => (
                        <DisplayText projectDetails={projDetails} key={j} categoryQuestions={category} updateText={shouldSave} />
                    ))}
                </div>
            ))}
            </section>
            </details>
           {/*<button onClick={() => {setShouldSave(true)}}  className='active:bg-gray-950 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg w-full'>Save</button>*/}
        </div>
    );
};

export default DisplayExtracted;
