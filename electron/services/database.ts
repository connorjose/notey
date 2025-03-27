import Database  from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const dbPath = path.join(process.cwd(), 'electron/data/notes.db');
const dir = path.dirname(dbPath);
console.log('Database directory:', dir);
console.log('Database path:', dbPath);

if (!fs.existsSync(dbPath)) {
    console.log('hit');
    console.log('creating db file:', dir);
    fs.openSync(dbPath, 'w');
}

let db: Database.Database;

try {
    console.log('Create db');
    db = new Database(dbPath, { verbose: console.log, nativeBinding: "true" });
    console.log('the db:', db);
    db.prepare('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)').run();
    db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run('Welcome to NoteApp', 'This is a sample note. You can edit this note or add a new one.');
} catch (error) { 
    console.error('Error opening database:', error);
    throw new Error('Database initialization failed.');
}

export default db;