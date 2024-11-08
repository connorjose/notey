const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => ipcRenderer.send('node', process.version.node),
    thing: true
    // chrome: () => process.version.chrome,
    // electron: () => process.version.electron
})