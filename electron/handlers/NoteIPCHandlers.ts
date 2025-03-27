import { ipcMain } from "electron";
import noteService from "../services/NoteService";
import { INote } from "../../src/models/INote";

export function registerHandlers() {
  ipcMain.handle('add-note', async (_, note: INote) => noteService.addNote(note));
  ipcMain.handle('delete-note', async (_, noteId: number) => noteService.removeNote(noteId));
  ipcMain.handle('edit-note', async (_, note: INote) => noteService.editNote(note));
  ipcMain.handle('get-notes', async () => noteService.getNotes());
}