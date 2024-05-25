// import { useState } from "react";
import { INote } from "../models/INote";

function NoteItem({note}: {note: INote}) {

    // update to be a material like card
    return (
        <li className="text-xl text-teal-400" key={note.id}>{note.title}</li>
    );
}

export default NoteItem;