// import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";

function NotePanel({notes, selectedNote}: {notes: INote[], selectedNote: number}) {
    
    // List of notes
    // Searchable and reoderable
    // each not should be its on card based UI design
    // TODO: Break down the unordered to be a card component for each saved note
    return (
        <div className="sidepanel-container">
            <SearchBox />
            <NoteList notes={notes} selectedNote={selectedNote} />
        </div>
    )
}

export default NotePanel;