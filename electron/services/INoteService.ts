import { INote } from '../../src/models/INote';

export type INoteService = {
    getNotes: () => INote[];
    addNote: (note: INote) => Promise<INote[]>;
    editNote: (note: INote) => void;
    removeNote: (noteId: number) => Promise<INote[]>;
}