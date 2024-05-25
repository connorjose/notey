import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";

function NoteApp({notes}: {notes: INote[]}) {
    const [selectedNote] = useState(0);
    return (
        <div className="flex flex-row h-screen w-screen">
            <NotePanel notes={notes} selectedNote={selectedNote}/>
            <NoteArea note={getSelectedNote(notes, selectedNote)}/>
        </div>
    );

}

function getSelectedNote(notes: INote[], selectedNote: number) {
    return notes[selectedNote];
}

export default NoteApp;