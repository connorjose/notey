/* eslint-disable @typescript-eslint/no-unused-vars */
import { INote } from "../models/INote";
interface NoteItemProps {
    note: INote,
    onNoteClick: () => void,
    selectedNote: number,
    onDeleteClick: (noteId: number) => void
    noteIndex: number
}

function NoteItem({
    note, 
    onNoteClick,
    selectedNote,
    onDeleteClick,
    noteIndex
}: NoteItemProps): JSX.Element {
    const summary = note.content.length > 20 ? note.content.substring(0, 20) + '...' : note.content;
    const selected = selectedNote === noteIndex;
    const title = note.title.length > 15 ? note.title.substring(0, 15) + '...' : note.title;

    return (
        <>
            <a
                className="note-item"
                href="#"
                key={noteIndex}
                onClick={onNoteClick}
            >
            <p>{title}</p>
            </a>
        </>
    );
}

export default NoteItem;