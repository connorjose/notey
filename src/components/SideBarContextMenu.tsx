import React from "react";
import { INote } from "@/models/INote";
import { ContextMenu,
        ContextMenuContent, 
        ContextMenuItem,  
        ContextMenuTrigger } from "./ui/context-menu";
import { useNotes } from "@/context/NotesContext";

interface SideBarContextMenuProps {
    note: INote,
    children: React.ReactNode
}

export function SideBarContextMenu({ note, children }: SideBarContextMenuProps): JSX.Element {
    const { deleteNote } = useNotes();

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
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