import { INote } from "@/models/INote";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotesHandler = (e: any, notes: INote[]) => void;

const onNotes = (handler: NotesHandler) => {
    window.bridge.on('note-data', handler);
}

const offNotes = (handler: NotesHandler) => {
    window.bridge.off('note-data', handler);
}

const addNote = async (payload: {title: string, content: string}): Promise<INote[]> => {
    return (await window.bridge.invoke('add-note', payload)) as INote[];
}

const editNote = async (note: INote): Promise<INote[]> => {
  return (await window.bridge.invoke('edit-note', note)) as INote[];
};

const deleteNote = async (id: number): Promise<INote[]> => {
  return (await window.bridge.invoke('delete-note', id)) as INote[];
};

export default { onNotes, offNotes, addNote, editNote, deleteNote };