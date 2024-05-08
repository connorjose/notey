import { useState } from "react";
import Textarea from './TextArea';
import HeadArea from "./HeadingArea";

function NoteArea({note}) {
    return (
        <div className="notearea-container">
            <HeadArea title={note.title}/>
            <Textarea content={note.content}/>
        </div>
    );

    // Define note area for note taking
    // Store state of the note to detect if changes have occured
    // Contains both the heading area and text area

}

export default NoteArea;