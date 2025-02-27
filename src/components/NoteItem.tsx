import { INote } from "../models/INote";
import { NavLink } from "@mantine/core";

interface NoteItemProps {
    note: INote,
    onNoteClick: () => void,
    selectedNote: number
}

function NoteItem({
    note, 
    onNoteClick,
    selectedNote
}: NoteItemProps): JSX.Element {

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