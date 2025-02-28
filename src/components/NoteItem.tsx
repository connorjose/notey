import { IconFileX } from "@tabler/icons-react";
import { INote } from "../models/INote";
import { ActionIcon, NavLink } from "@mantine/core";

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
    const summary = note.content.substring(0, 15);
    const selected = selectedNote === noteIndex;

    return (
        <>
            <NavLink
                href="#"
                key={noteIndex}
                label={note.title}
                active={selected}
                description={summary}
                onClick={onNoteClick}
                rightSection={
                    <ActionIcon onClick={(e) => { e.stopPropagation(); onDeleteClick(note.id); }}>
                        <IconFileX />
                    </ActionIcon>
                }
            />
        </>
    );
}

export default NoteItem;