import { Menu } from 'electron';
import noteService from '../services/NoteService';
import { VITE_DEV_SERVER_URL }from './Window'

export function createMenuTemplate (window: Electron.BrowserWindow) {

    const isMac = process.platform === 'darwin';
    const searchAccelerator = isMac ? 'Command+F' : 'Ctrl+F';
    const addNoteAccelerator = isMac ? 'Command+N' : 'Ctrl+N';

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
                {
                    label: 'Search Notes',
                    accelerator: searchAccelerator,
                    click: () => {
                        window.webContents.send('focus-search');
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ],
        }
    ];

    if (VITE_DEV_SERVER_URL) {
        const devToolsToggle = isMac ? 'Command+Shift+I' : 'Ctrl+Shift+I';
        template.push(
            {
                label: 'Window',
                submenu: [
                    {
                        label: 'Toggle Dev Tools',
                        accelerator: devToolsToggle,
                        click: () => {
                            window.webContents.openDevTools();
                        }
                    }
                ]
            }
        )
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}