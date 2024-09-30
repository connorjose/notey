import React, { useState } from "react";
import { INote } from "../models/INote";

function SearchBox({notes} : {notes: INote[]}) {
    const [text, setText] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const findMatchingNotes = (searchString: string) => {
        const note = notes.find(n => n.content.includes(searchString));
        console.log(note)
    }

    findMatchingNotes(text);

    return (
        <div className="search-container">
            <input type="text" onChange={handleSearchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
            p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
        </div>
    );
}

export default SearchBox;