// Import necessary modules from Electron
    const { app, BrowserWindow } = require('electron');
    const path = require('path');
    const url = require('url');

    // Define the URL for the frontend application
    const FRONTEND_DEV_URL = 'http://localhost:5173'; // Assuming Vite dev server runs on 5173
    const FRONTEND_BUILD_PATH = path.join(__dirname, '..', 'frontend', 'dist', 'index.html'); // Path to built React app

    let mainWindow; // Declare mainWindow globally to prevent garbage collection

    // Function to create the main browser window
    function createWindow() {
      mainWindow = new BrowserWindow({
        width: 1000, // Set the initial width of the window
        height: 800, // Set the initial height of the window
        minWidth: 800, // Minimum width
        minHeight: 600, // Minimum height
        backgroundColor: '#282c34', // Set a background color for the window
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'), // Preload script for secure IPC (Inter-Process Communication)
          nodeIntegration: false, // Disable Node.js integration for security
          contextIsolation: true, // Isolate preload script from main world for security
          devTools: true // Enable DevTools for debugging (set to false for production)
        },
        icon: path.join(__dirname, '..', 'public', 'icon.png') // Path to an application icon (create this later)
      });

      // --- TEMPORARY DEBUGGING CHANGE: Force loading the development URL ---
      // This will bypass the NODE_ENV check to ensure Electron loads from the Vite dev server
      const startUrl = FRONTEND_DEV_URL;
      // --- END TEMPORARY DEBUGGING CHANGE ---

      mainWindow.loadURL(startUrl);

      // Open the DevTools.
      // mainWindow.webContents.openDevTools(); // Uncomment to open DevTools automatically
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {
      createWindow();

      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    });

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });

    // Optional: Add a 'before-quit' listener to stop the backend server if needed
    app.on('before-quit', () => {
        console.log('Electron app is about to quit.');
    });