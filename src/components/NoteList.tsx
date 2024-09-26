import NoteItem from "./NoteItem";
import { INote } from "../models/INote";

function NoteList({notes, selectedNote, onNoteSelect}: {notes: INote[], selectedNote: number, onNoteSelect: any}) {

    const rows: React.JSX.Element[] = [];

    function handleSelect(noteId:number)
    {
        onNoteSelect(noteId);
    }

    notes.forEach(note => {
        rows.push(
            <NoteItem note={note} key={note.id} onNoteClick={() => {handleSelect(note.id)}} />
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