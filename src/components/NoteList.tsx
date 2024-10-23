import NoteItem from "./NoteItem";
import { INote } from "../models/INote";

function NoteList({
    notes, 
    selectedNote, 
    onNoteSelect
}:{
    notes: INote[], 
    selectedNote: number, 
    onNoteSelect: (noteId:number) => void }) {

    const rows: React.JSX.Element[] = [];

    const handleSelect = (noteId:number) =>
    {
        onNoteSelect(noteId);
    }

    notes.forEach(note => {
        rows.push(
            <NoteItem note={note} key={note.id} selectedNote={selectedNote} onNoteClick={() => {handleSelect(note.id)}} />
        );
    });

    return (
        <>
            {rows}
        </>
    );
}

export default NoteList;