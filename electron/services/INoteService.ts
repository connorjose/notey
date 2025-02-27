import { INote } from '../../src/models/INote';

export interface INoteService {
    addNote(note: INote): Promise<void>;
    editNote(note: INote): void;
    removeNote(noteId: number): void;
}