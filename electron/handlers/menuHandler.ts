import { ContextMenuParams, Event, Menu } from 'electron';
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

export function ContextMenuTemplate (window: Electron.BrowserWindow) {
    const template: Electron.MenuItemConstructorOptions[] = [
        { 
            role: 'delete',
            click: () => {
                window.webContents.send('context-menu-delete');
            }
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    window.webContents.on('context-menu', (event: Event, params: ContextMenuParams) => {
        console.log('event', event);
        console.log('params', params);
        if (params.linkURL) {
            menu.popup();
        }
    });
}