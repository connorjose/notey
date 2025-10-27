import TextArea from './TextArea';
import { INote } from "../models/INote";

interface NoteAreaProps {
    note: INote;
    onNoteUpdate: (updatedNote: INote) => void;
}   

function NoteArea({note, onNoteUpdate}: NoteAreaProps): JSX.Element {

    const handleTitleChange = (newTitle: string) => {
        onNoteUpdate({...note, title: newTitle})
    }

    const handleContentChange = (newContent: string) => {
        onNoteUpdate({...note, content: newContent})
    }

    return (
        <div className="note-area">
            <TextArea content={note.title} onContentChange={handleTitleChange}/>
            <TextArea content={note.content} onContentChange={handleContentChange}/>
        </div>
    );
}

export default NoteArea;