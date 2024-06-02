'use client'

import React, { useEffect, useState } from 'react';
interface Question {
    Question: string;
    answer: string;
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
}

const DisplayText: React.FC<DisplayTextProps> = ({ categoryQuestions }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg mb-4">
            <h2 contentEditable="true" className="text-xl font-bold mb-2 text-gray-700">{categoryQuestions.category_name}</h2>
            <details className="bg-gray-100 p-2 rounded">
                <summary className="cursor-pointer text-gray-600">Show Questions</summary>
                <div className="mt-2 space-y-4">
                    {categoryQuestions.Questions.map((question, i) => (
                        <div key={i} className="p-2 bg-white border rounded">
                            <h3 contentEditable="true"  className="text-lg font-semibold text-gray-800">{question.Question}</h3>
                            {question.answer !=null && <h4 contentEditable="true"  className="text-gray-600">{question.answer}</h4>}
                        </div>
                    ))}
                </div>
            </details>
        </div>
    );
};

const DisplayExtracted: React.FC<DisplayExtractedProps> = ({  }) => {

  const [extractedText, setExtractedText] = useState([])
  
  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectIdFromParams = urlParams.get('projectId');
    let getAllData = JSON.parse(localStorage.getItem("projects"))

    let getSpecificProjIndex = getAllData.findIndex(item => item.projectId === projectIdFromParams)
    console.log(getAllData)
    console.log(getAllData[getSpecificProjIndex])
    let getJsonString = JSON.parse(getAllData[getSpecificProjIndex].projectExtracted)
    console.log(getJsonString)
    let getExtractedText = [...getJsonString[0].chapters]
    setExtractedText(getExtractedText)
    console.log(extractedText)
  }, [])

    //extractedText = extractedText.findIndex
  

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {extractedText.map((chapter, i) => (
                <div key={i} className="mb-8">
                    <h1  contentEditable="true"  className="text-2xl font-bold mb-4 text-blue-700">{chapter.chapter_name}</h1>
                    {chapter.Categories.map((category, j) => (
                        <DisplayText key={j} categoryQuestions={category} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DisplayExtracted;
