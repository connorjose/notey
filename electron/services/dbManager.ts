import Database  from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'electron/data/notes.db');

let db: Database.Database;

try {
    db = new Database(dbPath);
    db.prepare('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)').run();
} catch (error) { 
    console.error('Error opening database:', error);
    throw new Error('Database initialization failed.');
}

export default db;