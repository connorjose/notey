// import { useState } from "react";
import { MouseEventHandler } from "react";
import { INote } from "../models/INote";

function NoteItem({note, onClick}: {note: INote, onClick: any}) {

    const summary = note.content.substring(0, 30);
    // update to be a material like card

    return (
        <a key={note.id} onClick={e => {
            e.stopPropagation;
            onClick(note.id);
        }} 
        href="#" className="block max-w-sm m-2 p-2.5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
            <p className="font-normal text-xs text-gray-700 dark:text-gray-400">{summary}</p>
        </a>
    );
}

export default NoteItem;