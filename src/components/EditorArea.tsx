import { useState, useEffect } from "react";

interface EditorAreaProps {
    content: string,
    onContentChange: (newContent: string) => void
}

function EditorArea({content,
        onContentChange
    }: EditorAreaProps): JSX.Element {
        
    const [text, setText] = useState(content);

    useEffect(() => {
            setText(content);
    }, [content]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onContentChange(e.target.value);
    }


    return (
        <textarea name="" id="" defaultValue={text} onChange={handleTextChange}>
            
        </textarea>
    );

}

export default EditorArea;