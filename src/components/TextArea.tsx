import { useState, useEffect } from "react";
import { Textarea } from "@mantine/core";

function TextArea({
        content,
        minRows,
        maxRows,
        size,
        onContentChange
    }: {
        content: string,
        minRows: number,
        maxRows: number,
        size: string,
        onContentChange: (newContent: string) => void;
    }) {
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
        <Textarea
            placeholder={placeholder}
            value={text}
            onChange={handleTextChange}
            autosize
            minRows={minRows}
            maxRows={maxRows}
            size={size}
        />
    );

}

export default TextArea;