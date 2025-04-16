import { useEffect, useRef, useState } from "react";
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
    const focusSearchBox = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'f') {
                event.preventDefault();
                focusSearchBox.current?.focus();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
            <SearchBox 
                searchQuery={searchQuery} 
                onSearch={setSearchQuery} 
                addNote={addNote} 
                toggleSearchBoxFocus={focusSearchBox}
            />
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