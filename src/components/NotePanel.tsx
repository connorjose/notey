import { useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";
import { Container, Space } from "@mantine/core";

interface NotePanelProps {
    notes: INote[]
    selectedNote: number
    onNoteSelect: (noteId: number) => void
    onNoteAdd: () => void
    onNoteDelete: (noteId: number) => void
}

function NotePanel({
    notes, 
    selectedNote,
    onNoteSelect,
    onNoteAdd,
    onNoteDelete
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
            <SearchBox searchQuery={searchQuery} onSearch={setSearchQuery} addNote={onNoteAdd} />
            <Space h='sm' />
            <NoteList 
                notes={filteredNotes} 
                selectedNote={selectedNote} 
                onNoteSelect={onNoteSelect} 
                onNoteDelete={onNoteDelete}
            />
        </Container>
    )
}

export default NotePanel;