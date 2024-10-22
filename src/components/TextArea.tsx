import { useState, useEffect } from "react";

function TextArea({
        content, 
        onContentChange
    }: {
        content: string, 
        onContentChange: (newContent: string) => void;
    }) {
    const [text, setText] = useState(content)
    const autoComplete = "on";
    const placeholder = "Say something!";

    useEffect(() => {
        setText(content);
    }, [content]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onContentChange(e.target.value);
    }

    return (
        <textarea autoComplete={autoComplete} placeholder={placeholder} value={text} onChange={handleTextChange}></textarea>
    );

}

export default TextArea;