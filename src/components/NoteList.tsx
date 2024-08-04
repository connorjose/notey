import NoteItem from "./NoteItem";
import { INote } from "../models/INote";

function NoteList({notes, selectedNote, handleNoteChange}: {notes: INote[], selectedNote: number, handleNoteChange: any}) {

    const rows: React.JSX.Element[] = [];
    
    function getSelectedNote(notes: INote[], selectedNote: number) {
        return notes[selectedNote];
    }

    getSelectedNote(notes, selectedNote);

    notes.forEach(note => {
        rows.push(
            <NoteItem note={note} key={note.id} onClick={handleNoteChange} />
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