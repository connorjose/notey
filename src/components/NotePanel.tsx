// import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";

function NotePanel({notes, selectedNote, handleNoteChange}: {notes: INote[], selectedNote: number, handleNoteChange: any}) {
    
    // List of notes
    // Searchable and reoderable
    // each not should be its on card based UI design
    // TODO: Break down the unordered to be a card component for each saved note
    return (
        <div className="">
            <SearchBox />
            <NoteList notes={notes} selectedNote={selectedNote} handleNoteChange={handleNoteChange} />
        </div>
    )
}

export default NotePanel;