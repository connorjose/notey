import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";

function NoteApp({notes}) {
    const [selectedNote] = useState(0);
    return (
        <div className="flex flex-row">
            <NotePanel notes={notes} selectedNote={selectedNote}/>
            <NoteArea note={getSelectedNote(notes, selectedNote)}/>
        </div>
    );

}

function getSelectedNote(notes, selectedNote) {
    return notes[selectedNote];
}

export default NoteApp;