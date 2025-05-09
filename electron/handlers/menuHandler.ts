import { Menu } from 'electron';
import noteService from '../services/NoteService';

export function createMenuTemplate (window: Electron.BrowserWindow) {

    const isMac = process.platform === 'darwin';
    const searchAccelerator = isMac ? 'Command+F' : 'Ctrl+F';
    const addNoteAccelerator = isMac ? 'Command+N' : 'Ctrl+N';
    // const deleteNoteAccelerator = isMac ? 'Command+D' : 'Ctrl+D';

    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Note',
                    accelerator: addNoteAccelerator,
                    click: () => {
                        noteService.addNote({ title: 'Untitled', content: '', id: 0 });
                        window.webContents.send('note-data', noteService.getNotes());
                    }
                },
                // {
                //     label: 'Delete Note',
                //     accelerator: deleteNoteAccelerator,
                //     click: () => {
                //         // console.log('Delete Note clicked');
                //     }
                // },
                { type: 'separator' },
                {
                    label: 'Search Notes',
                    accelerator: searchAccelerator,
                    click: () => {
                        window.webContents.send('focus-search');
                    }
                },
                { role: 'quit' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}