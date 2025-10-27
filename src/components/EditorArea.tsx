import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useEffect } from "react";

interface EditorAreaProps {
    content: string,
    onContentChange: (newContent: string) => void
}

function EditorArea({content,
        onContentChange
    }: EditorAreaProps): JSX.Element {
        
    const [text, setText] = useState(content);

    return (
        <textarea name="" id="" defaultValue={text} onChange={}>
            
        </textarea>
    );

}

export default EditorArea;