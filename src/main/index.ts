import { app, BrowserWindow } from 'electron';
import * as path from 'path'

// import NOTES from '../data/noteData'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.mjs'),
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    // win.webContents.send('data:notes', NOTES);
    win.loadFile(path.join(__dirname, '../renderer/src/renderer/index.html'));
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})