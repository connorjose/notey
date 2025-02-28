import NoteItem from "./NoteItem";
import { INote } from "../models/INote";

interface NoteListProps {
    notes: INote[]
    selectedNote: number
    onNoteSelect: (noteId: number) => void
    onNoteDelete: (noteId: number) => void
}

function NoteList({
    notes, 
    selectedNote, 
    onNoteSelect,
    onNoteDelete
}: NoteListProps): JSX.Element {

    const rows: React.JSX.Element[] = [];

    notes.forEach((note, idx) => {
        rows.push(
            <NoteItem 
                note={note} 
                key={idx} 
                selectedNote={selectedNote} 
                onNoteClick={() => {onNoteSelect(idx)}} 
                onDeleteClick={onNoteDelete}
                noteIndex={idx}
            />
        );
    });

    return (
        <>
            {rows}
        </>
    );
}

export default NoteList;