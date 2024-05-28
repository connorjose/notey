import NoteItem from "./NoteItem";
import { INote } from "../models/INote";
import { useCallback } from "react";

function NoteList({notes, selectedNote}: {notes: INote[], selectedNote: number}) {

    const rows: React.JSX.Element[] = [];
    function getSelectedNote(notes: INote[], selectedNote: number) {
        return notes[selectedNote];
    }

    const updateSelectedNote = useCallback((noteId: number) => {
        selectedNote = noteId;
    }, [selectedNote]);

    getSelectedNote(notes, selectedNote);

    notes.forEach(note => {
        rows.push(
            <NoteItem note={note} key={note.id} onClick={updateSelectedNote(note.id)} />
        );
    });

    return (
        <div className="note-list mt-5">
            <ul>
                {rows}
            </ul>
        </div>
    );
}

export default NoteList;