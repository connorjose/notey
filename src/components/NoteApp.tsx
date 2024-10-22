import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";

function NoteApp({userNotes}: {userNotes: INote[]}) {
    const [notes, setNotes] = useState(userNotes);
    const [selectedNote, setSelecteNote] = useState(0);

    const handleNoteChange = (noteId:number) => {
        setSelecteNote(noteId);
    }

    const handleNoteUpdate = (updatedNote: INote) => {
        setNotes((prevNotes) => 
            prevNotes.map((note, idx) => 
                idx === selectedNote ? updatedNote : note
            )
        );
    }

    return (
        <div>
            <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={handleNoteChange} />
            <NoteArea note={notes[selectedNote]} onNoteUpdate={handleNoteUpdate}/>
        </div>
    );

}

export default NoteApp;