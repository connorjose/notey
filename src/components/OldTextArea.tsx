import { useState, useEffect } from "react";

interface TextAreaProps {
    content: string;
    onContentChange: (newContent: string) => void;
}

function TextArea({
        content,
        onContentChange
    }: TextAreaProps): JSX.Element {
    const [text, setText] = useState(content)
    const placeholder = "Say something!";

    useEffect(() => {
        setText(content);
    }, [content]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onContentChange(e.target.value);
    }

    return (
        <textarea
            placeholder={placeholder}
            value={text}
            onChange={handleTextChange}
        >
        </textarea>
    );

}

export default TextArea;