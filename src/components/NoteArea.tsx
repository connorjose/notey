// import { useState } from "react";
import Textarea from './TextArea';
import { INote } from "../models/INote";
import { Flex } from '@mantine/core';

function NoteArea({note, onNoteUpdate}: {note: INote, onNoteUpdate: (updatedNote: INote) => void}) {

    const handleTitleChange = (newTitle: string) => {
        onNoteUpdate({...note, title: newTitle})
    }

    const handleContentChange = (newContent: string) => {
        onNoteUpdate({...note, content: newContent})
    }

    return (
        <Flex direction="column">
            <Textarea content={note.title} onContentChange={handleTitleChange}/>
            <Textarea content={note.content} onContentChange={handleContentChange}/>
        </Flex>
    );
}

export default NoteArea;