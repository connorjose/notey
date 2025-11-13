import { app, BrowserWindow } from 'electron'
import { registerHandlers } from './handlers/NoteIPCHandlers'
import { createWindow, closeWindow } from './handlers/Window';
import noteService from './services/NoteService'

app.whenReady().then(() => {
  registerHandlers();
  createWindow();
}, (error) => console.error('Error loading app:', error));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    noteService.close();
    closeWindow();
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})