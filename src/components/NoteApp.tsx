import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";

function NoteApp({notes}: {notes: INote[]}) {
    const [selectedNote, setSelecteNote] = useState(0);

    function handleNoteChange(noteId:number) {
        setSelecteNote(noteId);
    }

    return (
        <div className="flex flex-row w-full h-screen align-top">
            <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={handleNoteChange}/>
            <NoteArea note={notes.find(n => n.id == selectedNote) ?? notes[0]}/>
        </div>
    );

}

export default NoteApp;