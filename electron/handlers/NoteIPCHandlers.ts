import { BrowserWindow, ipcMain } from "electron";
import noteService from "../services/NoteService";
import { INote } from "../../src/models/INote";
import { sideBarContextMenu } from "./MenuHandler";

export function registerHandlers() {
  ipcMain.handle('add-note', async (_, note: INote) => noteService.addNote(note));
  ipcMain.handle('delete-note', async (_, noteId: number) => noteService.removeNote(noteId));
  ipcMain.handle('edit-note', async (_, note: INote) => noteService.editNote(note));
  ipcMain.handle('get-notes', async () => noteService.getNotes());

  // Context menu handler
  ipcMain.handle('show-note-context-menu', (event, noteId: number) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    sideBarContextMenu(win, noteId);
  });
}