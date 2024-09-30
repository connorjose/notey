import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";

function NotePanel({
    notes, 
    selectedNote,
    onNoteSelect,
}: {
    notes: INote[], 
    selectedNote: number, 
    onNoteSelect: (noteId: number) => void }) {
    
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = notes.filter((note) => {
        const lowerCaseQuery = searchQuery.trim().toLowerCase();
        return (
            !lowerCaseQuery ||
            note.title.toLowerCase().includes(lowerCaseQuery) ||
            note.content.toLowerCase().includes(lowerCaseQuery)
        )
        
    })

    return (
        <div className="">
            <SearchBox searchQuery={searchQuery} onSearch={setSearchQuery} />
            <NoteList notes={filteredNotes} selectedNote={selectedNote} onNoteSelect={onNoteSelect} />
        </div>
    )
}

export default NotePanel;