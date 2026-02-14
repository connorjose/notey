import React from "react";
// import { INote } from "@/models/INote";
import { ContextMenu,
        ContextMenuContent,
        ContextMenuItem,
        ContextMenuTrigger } from "./ui/context-menu";
// import { useNotes } from "@/context/NotesContext";

interface ContentContextMenuProps {
    children: React.ReactNode
}

export function ContentContextMenu({ children }: ContentContextMenuProps): JSX.Element {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    Copy
                </ContextMenuItem>
                <ContextMenuItem>Cut</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}