import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import path from 'node:path';
import * as fs from 'fs';


const dataFilePath: string = path.join(process.cwd(), 'electron/data/notes.json');

function initNote()
{
    if (fs.existsSync(dataFilePath)) return;
    
    // Init note folder and file
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, '[]', 'utf8');
    const note: INote[] = [{
        id: 0,
        title: 'Untitled',
        content: ''
    }]

    writeData(note);
}

function readData(): INote[] {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

function writeData(notes: INote[]): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(notes), 'utf8');
}

const noteService: INoteService = {
    getNotes: () => readData(),

    addNote: async(note: INote) => {
        const notes = readData();
        note.id = notes.length;
        notes.push(note);
        writeData(notes);
        return notes;
    },

    editNote: async(note: INote) => {
        const notes = readData();
        const noteToEdit = notes.find(n => n.id === note.id);
        if (!noteToEdit) {
            throw new Error(`Note with id ${note.id} not found`);
        }
        noteToEdit.title = note.title;
        noteToEdit.content = note.content;
        return notes;
    },

    removeNote: async(noteId: number) => {
        let notes = readData();
        const noteIndex = notes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) {
            throw new Error(`Note with id ${noteId} not found`);
        }
        notes.splice(noteIndex, 1);
        notes = notes.map((note, idx) => ({ ...note, id: idx })); // Re-index IDs
        writeData(notes);
        return notes;
    }

}

// Init notes on import
initNote();

export default noteService;
