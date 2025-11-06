import { useNotes } from "@/context/NotesContext";
import Layout from "@/views/Layout";
import NoteArea from "./NoteArea";
import Skeleton from "./Skeleton";
import TextArea from "./TextArea";

export default function NoteApp()
{
    const { notes, selectedIndex, editNote } = useNotes();
    let selectedNoteData = Array.isArray(notes) ? notes[selectedIndex] : undefined;

    const handleTitleChange = (update: string) => {
        if (selectedNoteData) {
            selectedNoteData = { ...selectedNoteData, title: update }
            editNote(selectedIndex, selectedNoteData)
        }   
    }

    const handleContentChange = (update: string) => {
        if (selectedNoteData) {
            selectedNoteData = { ...selectedNoteData, content: update }
            editNote(selectedIndex, selectedNoteData)
        }   
    }

    if (selectedNoteData == undefined) {
    return (
        <Layout>
            <Skeleton />
        </Layout>
    )
    }

    return (
        <Layout>
            <NoteArea>
                <TextArea content={selectedNoteData.title} onContentChange={handleTitleChange}/>
                <TextArea content={selectedNoteData.content} onContentChange={handleContentChange}/>
            </NoteArea>
        </Layout>
    )

}