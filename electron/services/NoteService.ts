import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import path from 'node:path';
import { promises as fs } from 'fs';


const dataFilePath: string = path.join(process.cwd(), 'electron/data/notes.json');

async function initNote()
{
    // Check if note file exists
    try {
        await fs.access(dataFilePath);
    } catch (error) {
        await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
        await fs.writeFile(dataFilePath, '[]', 'utf8');
        const note: INote[] = [{
            id: 0,
            title: 'Untitled',
            content: ''
        }]
        await writeData(note);
    }
}

async function readData(): Promise<INote[]> {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

async function writeData(notes: INote[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(notes), 'utf8');
}

const noteService: INoteService = {
    getNotes: async () => await readData(),

    addNote: async(note: INote) => {
        const notes = await readData();
        note.id = notes.length;
        notes.push(note);
        await writeData(notes);
        return notes;
    },

    editNote: async(note: INote) => {
        const notes = await readData();
        const noteToEdit = notes.find(n => n.id === note.id);
        if (!noteToEdit) {
            throw new Error(`Note with id ${note.id} not found`);
        }
        noteToEdit.title = note.title;
        noteToEdit.content = note.content;
        await writeData(notes);
        return notes;
    },

    removeNote: async(noteId: number) => {
        let notes = await readData();
        const noteIndex = notes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) {
            throw new Error(`Note with id ${noteId} not found`);
        }
        notes.splice(noteIndex, 1);
        notes = notes.map((note, idx) => ({ ...note, id: idx })); // Re-index IDs
        await writeData(notes);
        return notes;
    }

}

// Init notes on import
initNote();

export default noteService;
