import { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";
import NoteList from "./NoteList";
import { INote } from "../models/INote";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent } from "./ui/sidebar";

interface NotePanelProps {
    notes: INote[]
    selectedNote: number
    changeSelectedNote: (noteId: number) => void
    addNote: () => void
    deleteNote: (noteId: number) => void
}

function NotePanel({
    notes, 
    selectedNote,
    changeSelectedNote,
    addNote,
    deleteNote
}: NotePanelProps): JSX.Element {
    
    // const [searchQuery, setSearchQuery] = useState("");
    // const searchBox = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     window.bridge.on("focus-search", focusSearchBox);

    //     return () => {
    //         window.bridge.off("focus-search", focusSearchBox)
    //     };
    // }, []);

    // const focusSearchBox = () => {
    //     if (searchBox.current) {
    //         searchBox.current.focus();
    //     }
    // }

    // const filteredNotes = notes.filter((note) => {
    //     const lowerCaseQuery = searchQuery.trim().toLowerCase();
    //     return (
    //         !lowerCaseQuery ||
    //         note.title.toLowerCase().includes(lowerCaseQuery) ||
    //         note.content.toLowerCase().includes(lowerCaseQuery)
    //     )
        
    // })

    return (
        <>
          <SidebarProvider>
            <Sidebar>
                SideBar
            </Sidebar>

          </SidebarProvider>
        </>
    )
}

export default NotePanel;