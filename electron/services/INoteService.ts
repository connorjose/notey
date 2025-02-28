import { INote } from '../../src/models/INote';

export interface INoteService {
    getNotes(): INote[];
    addNote(note: INote): Promise<INote[]>;
    editNote(note: INote): void;
    removeNote(noteId: number): void;
}