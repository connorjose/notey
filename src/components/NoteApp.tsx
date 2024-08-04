import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";

function NoteApp({notes}: {notes: INote[]}) {
    const [selectedNote, setSelecteNote] = useState(0);
    // const [note, setNote] = useState<INote>(notes[selectedNote]);
    const note = notes[selectedNote];
    const handleSelection = (id: number) => {
        setSelecteNote(id);
    }
    
    return (
        <div className="flex flex-row w-full h-screen align-top">
            <NotePanel notes={notes} selectedNote={selectedNote} handleNoteChange={handleSelection}/>
            <NoteArea note={note}/>
        </div>
    );

}

export default NoteApp;