// import { useState } from "react";
import Textarea from './TextArea';
import { INote } from "../models/INote";

function NoteArea({note}: {note: INote}) {

    return (
        <div className="w-3/4 flex flex-col ml-5">
            <Textarea content={note.title} textSize='3xl' topMargin='0' height='h-16' minHeight='min-h-min' minWidth='min-w-80'/>
            <Textarea content={note.content} textSize='sm' topMargin='5' height='h-3/4' minWidth='min-w-80' minHeight='min-h-80'/>
        </div>
    );

    // Define note area for note taking
    // Store state of the note to detect if changes have occured
    // Contains both the heading area and text area

}

export default NoteArea;