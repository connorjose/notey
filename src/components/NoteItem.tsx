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
    const summary = note.content.length > 20 ? note.content.substring(0, 20) + '...' : note.content;
    const selected = selectedNote === noteIndex;
    const title = note.title.length > 15 ? note.title.substring(0, 15) + '...' : note.title;

    return (
        <>
            <NavLink
                className="note-item"
                href="#"
                key={noteIndex}
                label={title}
                active={selected}
                description={summary}
                noWrap={true}
                onClick={onNoteClick}
                rightSection={
                    <ActionIcon 
                        className="delete-button" 
                        color="red" 
                        onClick={(e) => { e.stopPropagation(); onDeleteClick(note.id); }}>
                        <IconFileX />
                    </ActionIcon>
                }
            />
        </>
    );
}

export default NoteItem;