import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import path from 'node:path';
import * as fs from 'fs';

class NoteService implements INoteService {

    private dataFilePath: string
    private NOTES: INote[];

    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'electron/data/notes.json')
        this.NOTES = this.readData();
    }

    private readData(): INote[] {
        if (!fs.existsSync(this.dataFilePath)) {
            return [];
        }
        const data = fs.readFileSync(this.dataFilePath, 'utf8');
        return JSON.parse(data);
    }

    private writeData(notes: INote[]): void {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(notes), 'utf8');
    }

    public getNotes(): INote[] {
        return this.NOTES;
    }

    public async addNote(note: INote): Promise<INote[]> {
        note.id = this.NOTES.length;
        this.NOTES.push(note);
        this.writeData(this.NOTES);
        return this.NOTES;
    }

    public async editNote(note: INote): Promise<INote[]> {
        const noteToEdit = this.NOTES.find(n => n.id === note.id);
        if (!noteToEdit) {
            throw new Error(`Note with id ${note.id} not found`);
        }
        noteToEdit.title = note.title;
        noteToEdit.content = note.content;

        this.writeData(this.NOTES);
        return this.NOTES;
    }

    public async removeNote(noteId: number): Promise<boolean> {
        const noteIndex = this.NOTES.findIndex(n => n.id === noteId);
        if (noteIndex === -1) {
            throw new Error(`Note with id ${noteId} not found`);
        }
        this.NOTES.splice(noteIndex, 1);
        this.writeData(this.NOTES);

        return true;
    }
}

export default NoteService;
