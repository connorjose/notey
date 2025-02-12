import { INote } from "../../models/INote";
import { NavLink } from "@mantine/core";

function NoteItem({
    note, 
    onNoteClick,
    selectedNote
}: {
    note: INote, 
    onNoteClick: () => void,
    selectedNote: number}) {

    const summary = note.content.substring(0, 30);
    const selected = selectedNote === note.id

    return (
        <NavLink
            href="#"
            key={note.id}
            label={note.title}
            active={selected}
            description={summary}
            onClick={onNoteClick}
        />
    );
}

export default NoteItem;