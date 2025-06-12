// preload.js (Electron Preload Script)
    // This script runs before your web page starts to load in the renderer process.
    // It has access to Node.js APIs (like 'path' or 'fs') but is isolated from the main world,
    // meaning global objects like 'window' or 'document' won't have Node.js APIs directly exposed.
    // This is a security measure to prevent malicious code in the web page from accessing system resources.

    const { contextBridge, ipcRenderer } = require('electron');

    // Expose a limited set of APIs to the renderer process (your React app)
    // You can define functions here that your React app can call to interact with Electron's main process.
    contextBridge.exposeInMainWorld('electronAPI', {
      // Example: A function that sends a message to the main process
      // send: (channel, data) => ipcRenderer.send(channel, data),
      // Example: A function that listens for messages from the main process
      // on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
    });

    // For this calculator app, we don't strictly need complex IPC at this stage
    // as the React app directly talks to the Node.js backend.
    // However, if you needed to do things like:
    // - Save/Open files via native dialogs
    // - Access OS-specific features
    // - Minimize/Maximize the Electron window from React
    // Then you would define those functions here and use ipcRenderer.
    