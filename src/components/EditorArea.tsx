import { RichTextEditor, Link } from "@mantine/tiptap"
import { useEditor } from '@tiptap/react';
// import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useEffect } from "react";
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';

function EditorArea({content,
        onContentChange
    }: {
        content:string,
        onContentChange: (newContent:string) => void
    }) {
    const [text, setText] = useState(content);

    

    const editor = useEditor({
        extensions: [
            StarterKit,
            // Underline,
            Link,
            // Superscript,
            // SubScript,
            // Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
          ],
          onUpdate({ editor }) {
            setText(editor.getText());
            onContentChange(editor.getText());
          },
          content: text,
    });

    useEffect(() => {
        setText(content);
        editor?.commands.setContent(content);
    }, [content, editor]);

    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content></RichTextEditor.Content>
        </RichTextEditor>
    );

}

export default EditorArea;