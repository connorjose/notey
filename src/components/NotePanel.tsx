// import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";

function NotePanel({
    notes, 
    selectedNote,
    onNoteSelect
}: {
    notes: INote[], 
    selectedNote: number, 
    onNoteSelect: (noteId: number) => void }) {
    return (
        <div className="">
            <SearchBox />
            <NoteList notes={notes} selectedNote={selectedNote} onNoteSelect={onNoteSelect} />
        </div>
    )
}

export default NotePanel;