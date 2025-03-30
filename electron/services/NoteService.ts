import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import db from './dbManager'

const noteService: INoteService = {
    getNotes: (): INote[] => {
        return db.prepare('SELECT * FROM notes').all() as INote[];
    },

    addNote: async(note: INote) => {
        const query = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
        query?.run(note.title, note.content);
        return noteService.getNotes();
    },

    editNote: async(note: INote) => {
        const query = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?');
        query?.run(note.title, note.content, note.id);
        return noteService.getNotes();
    },

    removeNote: async(noteId: number) => {
        const query = db.prepare('DELETE FROM notes WHERE id = ?');
        query?.run(noteId);
        return noteService.getNotes();
    },

    close: () => {
        db.close();
    }

}

export default noteService;
