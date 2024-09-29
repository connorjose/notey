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
        <div className="w-3/4 flex flex-col ml-5">
            <Textarea content={note.title} onContentChange={handleTitleChange} textSize='3xl' topMargin='0' height='h-16' minHeight='min-h-min' minWidth='min-w-80'/>
            <Textarea content={note.content} onContentChange={handleContentChange} textSize='sm' topMargin='5' height='h-3/4' minWidth='min-w-80' minHeight='min-h-80'/>
        </div>
    );
}

export default NoteArea;