import { app, BrowserWindow } from 'electron'
import { registerHandlers } from './handlers/NoteIPCHandlers'
import { windowManager } from './handlers/Window';
import noteService from './services/NoteService'

app.whenReady().then(() => {
  registerHandlers();
  windowManager.createWindow();
}, (error) => console.error('Error loading app:', error));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    noteService.close();
    windowManager.closeAll();
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    windowManager.createWindow();
  }
})
