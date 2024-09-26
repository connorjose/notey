import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";

function NoteApp({notes}: {notes: INote[]}) {
    const [selectedNote, setSelecteNote] = useState(0);
    const currentNote = notes[selectedNote];

    // const handleSelection = (noteid: number) => {
    //     console.log(selectedNote);
    //     setSelecteNote(noteid);
    // }

    function handleNoteChange(noteId:number) {
        console.log(selectedNote);
        setSelecteNote(noteId);
        console.log(selectedNote);
        console.log(currentNote);
    }

    
    return (
        <div className="flex flex-row w-full h-screen align-top">
            <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={handleNoteChange}/>
            <NoteArea note={notes.find(n => n.id == selectedNote) ?? notes[0]}/>
        </div>
    );

}

export default NoteApp;