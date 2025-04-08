import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { registerHandlers } from './handlers/NoteIPCHandlers'
import noteService from './services/NoteService'
import { INote } from '../src/models/INote'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {

  win = new BrowserWindow({
    width: 1300,
    height: 1000,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: process.env.NODE_ENV !== 'production' || !app.isPackaged
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.webContents.once('did-finish-load', () => {
    try {
      let notes: INote[] = noteService.getNotes();
      if (notes.length < 1) {
        const introNote: INote = {
          id: 1,
          title: "Welcome to note app",
          content: "This is a sample note. You can edit this note or add a new one."
        }
        noteService.addNote(introNote);
        notes = noteService.getNotes();
      }

      win?.webContents.send('note-data', notes);
    } catch (error) {
      console.error('Error fetching notes:', error); 
    }
  });
}

app.whenReady().then(() => {
  registerHandlers();
  createWindow();
}, (error) => console.error('Error loading app:', error));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    noteService.close();
    win = null
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})