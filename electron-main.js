// // const { app, BrowserWindow } = require('electron');
// // const path = require('path');

// // app.whenReady().then(() => {
// //   let mainWindow = new BrowserWindow({
// //     width: 1200,
// //     height: 800,
// //     webPreferences: {
// //       nodeIntegration: true,
// //       contextIsolation: false
// //     }
// //   });

// //   // Ensure the correct path
// //   const indexPath = `file://${path.resolve(__dirname, 'dist', 'shivam-electronics', 'index.html')}`;
  
// //   console.log("Loading URL:", indexPath); // Debugging output

// //   mainWindow.loadURL(indexPath);
// // });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// app.whenReady().then(() => {
//   let mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });

//   const indexPath = `file://${path.resolve(__dirname, 'dist', 'shivam-electronics', 'index.html')}`;
  
//   console.log("Loading URL:", indexPath); // Debugging output

//   mainWindow.loadURL(indexPath);
// });
const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Open DevTools for debugging
  mainWindow.webContents.openDevTools();

  // C:\Shivam Electronics Project\shivam_Electronics\src\index.html
  // Load the correct path
  // const indexPath = `file://${path.resolve(__dirname, 'dist', 'shivam-electronics', 'index.html')}`;

  // console.log("Loading URL:", indexPath); // Debugging output

  // mainWindow.loadURL(indexPath);
  const indexPath = path.join(__dirname, 'dist/shivam-electronics/browser/', 'browser', 'index.html');
  mainWindow.loadFile(indexPath);
  
  // Handle errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorDescription} (Code: ${errorCode})`);
  });
});

