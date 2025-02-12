import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('versions', {
    node: () => ipcRenderer.send('node', process.versions.node),
    thing: true,
    notes: () => ipcRenderer.on('data:notes', (value) => value),
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})