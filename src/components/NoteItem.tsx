import { INote } from "../models/INote";

function NoteItem({
    note, 
    onNoteClick,
    selectedNote
}: {
    note: INote, 
    onNoteClick: () => void,
    selectedNote: number}) {

    const summary = note.content.substring(0, 30);
    // update to be a material like card
    // TODO: pass in selected not idx for conditional styling
    const selected = selectedNote === note.id
    const selectedStyle = "block max-w-sm m-2 p-2.5 bg-white border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-700 dark:border-gray-700"
    const notSelectedStyle = "block max-w-sm m-2 p-2.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"

    return (
        <a key={note.id} onClick={onNoteClick} 
            href="#" className={selected ? selectedStyle : notSelectedStyle}>
            <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
            <p className="font-normal text-xs text-gray-700 dark:text-gray-400">{summary}</p>
        </a>
    );
}

export default NoteItem;