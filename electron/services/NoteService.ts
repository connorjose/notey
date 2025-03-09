import { INote } from '../../src/models/INote';
import { INoteService } from './INoteService';
import path from 'node:path';
import * as fs from 'fs';

class NoteService implements INoteService {

    private readonly dataFilePath: string = path.join(process.cwd(), 'electron/data/notes.json');
    private NOTES: INote[];

    constructor() {
        this.initNote();
        this.NOTES = this.readData();
    }

    private initNote()
    {
        if (fs.existsSync(this.dataFilePath)) return;
        
        // Init note folder and file
        fs.mkdirSync(path.dirname(this.dataFilePath), { recursive: true });
        fs.writeFileSync(this.dataFilePath, '[]', 'utf8');
        const note: INote[] = [{
            id: 0,
            title: 'Untitled',
            content: ''
        }]

        this.writeData(note);
    }

    private readData(): INote[] {
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

    public async removeNote(noteId: number): Promise<INote[]> {
        const noteIndex = this.NOTES.findIndex(n => n.id === noteId);
        if (noteIndex === -1) {
            throw new Error(`Note with id ${noteId} not found`);
        }
        this.NOTES.splice(noteIndex, 1);
        this.NOTES.forEach((note, idx) => {
            note.id = idx
        });

        this.writeData(this.NOTES);

        return this.NOTES;
    }
}

export default NoteService;
