import React from "react";
import { INote } from "@/models/INote";
import { ContextMenu,
        ContextMenuContent, 
        ContextMenuItem,  
        ContextMenuTrigger } from "./ui/context-menu";
import { useNotes } from "@/context/NotesContext";

interface SideBarContextMenuProps {
    note: INote,
    idx: number,
    children: React.ReactNode
}

export function SideBarContextMenu({ note, idx, children }: SideBarContextMenuProps): JSX.Element {
    const { setSelectedIndex, deleteNote } = useNotes();

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    onSelect={() => setSelectedIndex(idx)}
                >
                    Open
                </ContextMenuItem>
                <ContextMenuItem
                    onSelect={() => deleteNote(note.id)}
                    className="text-red-600"
                >
                    
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}   