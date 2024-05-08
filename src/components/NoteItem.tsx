import { useState } from "react";

function NoteItem({note}) {

    // update to be a material like card
    return (
        <li className="text-xl text-teal-400" key={note.id}>{note.title}</li>
    );

}

export default NoteItem;