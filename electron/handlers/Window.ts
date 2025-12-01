import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import noteService from '../services/NoteService'
import { AppMenuTemplate } from './MenuHandler'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const DefaultWindowOptions: BrowserWindowConstructorOptions = {
  width: 1300,
  height: 1000,
  show: false,
  icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
  webPreferences: {
    preload: path.join(__dirname, 'preload.mjs'),
    devTools: process.env.NODE_ENV !== 'production' || !app.isPackaged
  }
};

export class WindowManager {
  private instances = new Map<number, BrowserWindow>();

  createWindow(opts: BrowserWindowConstructorOptions = {}) {
    const merged = {
      ...DefaultWindowOptions,
      ...opts,
      webPreferences: {
        ...(DefaultWindowOptions.webPreferences || {}),
        ...(opts.webPreferences || {}),
        preload: (opts.webPreferences && opts.webPreferences.preload) ?? DefaultWindowOptions.webPreferences?.preload
      }
    };

    const win = new BrowserWindow(merged);

    if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL);
      if (merged.webPreferences?.devTools ?? process.env.NODE_ENV !== 'production') {
        win.webContents.openDevTools({ mode: 'right' });
      }
    } else {
      win.loadFile(path.join(RENDERER_DIST, 'index.html'));
    }

    win.webContents.on('did-finish-load', () => {
      try {
        const notes = noteService.getNotes();
        win.webContents.send('note-data', notes);
      } catch (err) {
        console.error('Failed to send notes to renderer', err);
      }
    });

    win.once('ready-to-show', () => {
      if (!merged.show) win.show();
    });

    win.on('closed', () => {
      this.instances.delete(win.id);
    });

    this.instances.set(win.id, win);

    // attach app menu (if any)
    try { AppMenuTemplate(win); } catch (e) { console.error('Failed to set app menu', e); }

    return win;
  }

  getWindow(id: number) {
    return this.instances.get(id) ?? null;
  }

  getAll() {
    return Array.from(this.instances.values());
  }

  closeWindow(id: number) {
    const w = this.instances.get(id);
    if (w && !w.isDestroyed()) w.close();
    this.instances.delete(id);
  }

  closeAll() {
    for (const w of this.instances.values()) {
      if (!w.isDestroyed()) w.close();
    }
    this.instances.clear();
  }

  broadcast(channel: string, ...args: any[]) {
    for (const w of this.instances.values()) w.webContents.send(channel, ...args);
  }
}

export const windowManager = new WindowManager();