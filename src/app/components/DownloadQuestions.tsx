// DownloadQuestions.tsx
import React from 'react';

export const DownloadQuestions: React.FC<{ project: any }> = ({ project }) => {
  const handleDownload = () => {
    //let parsedObj = JSON.parse(project)
    console.log(JSON.parse(project.projectExtracted))
    const data = formatProjectData(JSON.parse(project.projectExtracted))
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${project.projectName}-extracted.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatProjectData = (projectData: any) => {
    let data = '';

    //data += `Project ID: ${project.projectId}\n`;
    data += `Project Name: ${project.projectName}\n\n`;

    projectData.chapters.forEach((chapter: any) => {
      data += `Chapter: ${chapter.chapter_name}\n`;
      chapter.Categories.forEach((category: any) => {
        data += `  Category: ${category.category_name}\n`;
        category.Questions.forEach((question: any) => {
          data += `    Question: ${question.Question}\n`;
        });
        data += '\n';
      });
    });

    return data;
  };

  return (
    <button onClick={handleDownload} className='active:bg-gray-950 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg w-full'>
      Download
    </button>
  );
};
