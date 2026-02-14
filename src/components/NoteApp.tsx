import { useNotes } from "@/context/NotesContext";
import Layout from "@/views/Layout";
import NoteArea from "./NoteArea";
import Skeleton from "./Skeleton";
import { Textarea } from "./ui/textarea";
import React from "react";
import { ContentContextMenu } from "./ContentContextMenu";

export default function NoteApp()
{
    const { notes, selectedIndex, editNote } = useNotes();
    const selectedNoteData = Array.isArray(notes) ? notes[selectedIndex] : undefined;
    const placeholderText = "Write something!"

    const handleFieldChange = (field: "title" | "content") => 
        (value: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!selectedNoteData) return;
            const newVal = value.target.value;
            const updatedNote = { ...selectedNoteData, [field]: newVal };
            editNote(selectedIndex, updatedNote);
    }

    if (selectedNoteData == undefined) {
        // TODO: Create a modal to popup saying the notes data isn't avaliable? Error recovery?
        return (
            <Layout>
                <Skeleton />
            </Layout>
        )
    }

    return (
        <Layout>
            <NoteArea>
                <ContentContextMenu>
                    <Textarea
                        placeholder={placeholderText}
                        value={selectedNoteData.title} 
                        onChange={handleFieldChange("title")}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }  
                        }}
                        className="outline-none! resize-none! min-h-0! h-auto border-0 overflow-hidden text-2xl! mb-4 focus:ring-0 focus-visible:ring-0"
                        rows={1} 
                    />
                    <Textarea
                        placeholder={placeholderText}
                        value={selectedNoteData.content}
                        onChange={handleFieldChange("content")}
                        className="outline-none! resize-none! h-9/10 border-0 focus:ring-0 focus-visible:ring-0"
                    />
                </ContentContextMenu>
            </NoteArea>
        </Layout>
    )

}