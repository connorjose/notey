import NoteItem from "./NoteItem";

function NoteList({notes, selectedNote}) {

    const rows: any = [];
    function getSelectedNote(notes, selectedNote) {
        return notes[selectedNote];
    }

    notes.forEach(note => {
        rows.push(
            <NoteItem note={note} key={note.id} />
        );
    });

    return (
        <div className="note-list">
            <ul>
                {rows}
            </ul>
        </div>
    );
}

export default NoteList;