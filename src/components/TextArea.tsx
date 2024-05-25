// import { useState } from "react";

function TextArea({content, topMargin, textSize, height, minWidth, minHeight}: {content: string, topMargin: string, textSize:string, height: string, minWidth:string, minHeight:string}) {

    // Main text area
    // Track text changes using state
    const autoComplete = "on";
    const placeholder = "Say something!";
    // const topMargin = '10';
    // const textSize = 'sm';
    // const height = 'h-3/4';
    // const minWidth = 'min-w-80';
    // const minHeight = 'min-h-80';

    return (
        <textarea autoComplete={autoComplete} placeholder={placeholder} defaultValue={content}
            className={`block mt-${topMargin} p-2.5 align-top resize-none ${height} ${minWidth} ${minHeight} w-full text-${textSize} text-gray-900 bg-gray-50 
            rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}></textarea>
    );

}

export default TextArea;