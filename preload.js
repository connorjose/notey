const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => ipcRenderer.send('node', process.version.node),
    thing: true,
    notes: () => ipcRenderer.on('data:notes', (value) => value)
    // chrome: () => process.version.chrome,
    // electron: () => process.version.electron
})