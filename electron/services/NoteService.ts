import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import db from './database';
// import path from 'node:path';
// import { promises as fs } from 'fs';


// const dataFilePath: string = path.join(process.cwd(), 'electron/data/notes.json');

// async function initNote()
// {
//     // Check if note file exists
//     try {
//         await fs.access(dataFilePath);
//     } catch (error) {
//         await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
//         await fs.writeFile(dataFilePath, '[]', 'utf8');
//         const note: INote[] = [{
//             id: 0,
//             title: 'Untitled',
//             content: ''
//         }]
//         await writeData(note);
//     }
// }

// async function readData(): Promise<INote[]> {
//     const data = await fs.readFile(dataFilePath, 'utf8');
//     return JSON.parse(data);
// }

// async function writeData(notes: INote[]): Promise<void> {
//     await fs.writeFile(dataFilePath, JSON.stringify(notes), 'utf8');
// }

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
    }

}

export default noteService;
