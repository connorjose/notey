// import { useState } from "react";
import Textarea from './TextArea';
import { INote } from "../models/INote";

function NoteArea({note, onNoteUpdate}: {note: INote, onNoteUpdate: (updatedNote: INote) => void}) {

    const handleTitleChange = (newTitle: string) => {
        onNoteUpdate({...note, title: newTitle})
    }

    const handleContentChange = (newContent: string) => {
        onNoteUpdate({...note, content: newContent})
    }

    return (
        <div>
            <Textarea content={note.title} onContentChange={handleTitleChange}/>
            <Textarea content={note.content} onContentChange={handleContentChange}/>
        </div>
    );
}

export default NoteArea;