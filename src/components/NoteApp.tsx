import { INote } from "../models/INote";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { Center, Container, Flex } from "@mantine/core";

interface NoteAppProps {
    notes: INote[];
    selectedNote: number;
    onNoteSelect: (noteId: number) => void;
    onNoteUpdate: (updatedNote: INote) => void;
}

function NoteApp({ notes, selectedNote, onNoteSelect, onNoteUpdate }: NoteAppProps) {
    const selectedNoteData = notes[selectedNote];

    return (
        <Container fluid>
            <Flex gap="lg" direction="row" justify={Center} align={Center}>
                <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={onNoteSelect} />
                {selectedNoteData && (
                    <NoteArea note={selectedNoteData} onNoteUpdate={onNoteUpdate} />
                )}
            </Flex>
        </Container>
    );
}

export default NoteApp;