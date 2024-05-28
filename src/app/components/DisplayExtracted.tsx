import React from 'react';

export default function DisplayExtracted({ extractedText }) {
    function DisplayText({ categoryQuestions }) {
        return (
            <div>
                <h2>{categoryQuestions.category_name}</h2>
                <details>
                    <textarea readOnly>
                        {categoryQuestions.Questions.map((question, i) => (
                            <div key={i}>
                                <h3>{question.Question}</h3>
                                {question.answer.length > 0 && <h4>question.answer</h4>}
                            </div>
                        ))}
                    </textarea>
                </details>
            </div>
        );
    }

    return (
        <>
            {extractedText.map((obj, i) => (
                obj.chapters.map((chapter, j) => (
                    <div key={`${i}-${j}`}>
                        <h1>{chapter.chapter_name}</h1>
                        {chapter.Categories.map((category, k) => (
                            <DisplayText key={`${i}-${j}-${k}`} categoryQuestions={category} />
                        ))}
                    </div>
                ))
            ))}
        </>
    );
}
