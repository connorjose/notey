import * as fs from 'fs';
import * as path from 'path';
import { INote } from '../../src/models/INote';

class NoteService {
    private dataFilePath: string;

    constructor() {
        this.dataFilePath = path.join(__dirname, '../../srs/data/notes.json');
    }

    private readData(): INote[] {
        if (!fs.existsSync(this.dataFilePath)) {
            return [];
        }
        const data = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    private writeData(notes: INote[]): void {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(notes, null, 2), 'utf-8');
    }

    public addNote(note: INote): void {
        const notes = this.readData();
        notes.push(note);
        this.writeData(notes);
    }

    public editNote(note: INote): void {
        const notes = this.readData();
        const index = notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
            notes[index] = note;
            this.writeData(notes);
        } else {
            throw new Error('Note not found');
        }
    }

    public removeNote(noteId: number): void {
        const notes = this.readData();
        const filteredNotes = notes.filter(note => note.id !== noteId);
        this.writeData(filteredNotes);
    }
}

export default NoteService;
