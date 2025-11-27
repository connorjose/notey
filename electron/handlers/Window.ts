import { app, BrowserViewConstructorOptions, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import noteService from '../services/NoteService'
import { INote } from '../../src/models/INote'
import { AppMenuTemplate } from './MenuHandler'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// TODO: Move to class for handling the Window state
export let win: BrowserWindow | null

export function createWindow() {
  win = new BrowserWindow({
  width: 1300,
    height: 1000,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: process.env.NODE_ENV !== 'production' || !app.isPackaged
    },
  })
  
  AppMenuTemplate(win!);

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  win.on('ready-to-show', () => {
    LoadNotes(win!);
  });
}

export function closeWindow() {
    win = null;
}

function LoadNotes(win: BrowserWindow)  {
    try {
        let notes: INote[] = noteService.getNotes();
        if (notes.length < 1) {
            const introNote: INote = {
                id: 1,
                title: "Welcome to note app",
                content: "This is a sample note. You can edit this note or add a new one."
            }
            noteService.addNote(introNote)
            notes = noteService.getNotes();
        }
        win.webContents.send('note-data', notes);
    } catch (error) {
        // TODO: Add retry method?
        throw new Error("Unable to load notes");
    }
}

class Window {
  private win: BrowserWindow | null = null;

  constructor(private opts: BrowserViewConstructorOptions = {}) {
    this.opts = opts
  }

  create() {
    this.win = new BrowserWindow({
      width: 1300,
      height: 1000,
      show: false,
      icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.mjs'),
        ...this.opts.webPreferences
      },
      ...this.opts
    })



    return this.win
  }

  private load() {

  }

}