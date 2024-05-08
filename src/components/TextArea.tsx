// import { useState } from "react";

function TextArea({content}) {

    // Main text area
    // Track text changes using state
    const autoComplete = "on";
    const placeholder = "Say something!";

    return (
        <textarea autoComplete={autoComplete} placeholder={placeholder} defaultValue={content} className="main-text"></textarea>
    );

}

export default TextArea;