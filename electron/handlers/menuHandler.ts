import {  Menu } from 'electron';
import noteService from '../services/NoteService';

export function AppMenuTemplate (window: Electron.BrowserWindow) {
    const isMac = process.platform === 'darwin';
    // const searchAccelerator = isMac ? 'Command+F' : 'Ctrl+F';
    const addNoteAccelerator = isMac ? 'Command+N' : 'Ctrl+N';

    const template: Electron.MenuItemConstructorOptions[] = [
        ...(isMac ? [{ role: 'appMenu' as const }] : []),
        { role: 'fileMenu',
            submenu: [
                {
                    label: 'New Note',
                    accelerator: addNoteAccelerator,
                    click: () => {
                        noteService.addNote({ title: 'Untitled', content: '', id: 0 });
                        window.webContents.send('note-data', noteService.getNotes());
                    }
                }
            ]
        },
        { role: 'editMenu' },
        { role: 'viewMenu' }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}

export function sideBarContextMenu (window: Electron.BrowserWindow, noteId: number) {
    const template: Electron.MenuItemConstructorOptions[] = [
        { 
            label: 'Delete Note',
            click: async () => {
                try {
                    await noteService.removeNote(noteId);
                    window.webContents.send('note-data', noteService.getNotes());
                } catch (error) {
                    console.error('Error deleting note:', error);
                }   
            }
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window });
}