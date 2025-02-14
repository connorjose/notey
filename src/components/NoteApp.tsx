import { useState } from "react";
import NotePanel from "./NotePanel";
import NoteArea from "./NoteArea";
import { INote } from "../models/INote";
import { Center, Container, Flex } from "@mantine/core";

function NoteApp({userNotes}: {userNotes: INote[]}) {
    const [notes, setNotes] = useState(userNotes);
    const [selectedNote, setSelecteNote] = useState(0);

    const handleNoteChange = (noteId:number) => {
        setSelecteNote(noteId);
    }

    const handleNoteUpdate = (updatedNote: INote) => {
        setNotes((prevNotes) => 
            prevNotes.map((note, idx) => 
                idx === selectedNote ? updatedNote : note
            )
        );
    }
    return (
        <Container fluid>
            <Flex gap="lg" direction="row" justify={Center} align={Center}>
                <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={handleNoteChange} />
                <NoteArea note={notes[selectedNote]} onNoteUpdate={handleNoteUpdate}/>
            </Flex>
        </Container>  
    );

}

export default NoteApp;