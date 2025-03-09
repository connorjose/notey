import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";
import { Container, Space } from "@mantine/core";

interface NotePanelProps {
    notes: INote[]
    selectedNote: number
    changeSelectedNote: (noteId: number) => void
    addNote: () => void
    deleteNote: (noteId: number) => void
}

function NotePanel({
    notes, 
    selectedNote,
    changeSelectedNote,
    addNote,
    deleteNote
}: NotePanelProps): JSX.Element {
    
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
        <Container fluid>
            <SearchBox searchQuery={searchQuery} onSearch={setSearchQuery} addNote={addNote} />
            <Space h='sm' />
            <NoteList 
                notes={filteredNotes} 
                selectedNote={selectedNote} 
                onNoteSelect={changeSelectedNote} 
                onNoteDelete={deleteNote}
            />
        </Container>
    )
}

export default NotePanel;