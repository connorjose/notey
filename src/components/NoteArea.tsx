// import { useState } from "react";
import TextArea from './TextArea';
import { INote } from "../models/INote";
import EditorArea from './EditorArea';
import { Flex } from '@mantine/core';

interface NoteAreaProps {
    note: INote;
    onNoteUpdate: (updatedNote: INote) => void;
}   

function NoteArea({note, onNoteUpdate}: NoteAreaProps): JSX.Element {

    const handleTitleChange = (newTitle: string) => {
        onNoteUpdate({...note, title: newTitle})
    }

    const handleContentChange = (newContent: string) => {
        onNoteUpdate({...note, content: newContent})
    }

    return (
        <Flex direction="column" gap="sm" className="note-area">
            <TextArea content={note.title} onContentChange={handleTitleChange} minRows={1} maxRows={1} size='xl'/>
            <EditorArea content={note.content} onContentChange={handleContentChange}/>
        </Flex>
    );
}

export default NoteArea;