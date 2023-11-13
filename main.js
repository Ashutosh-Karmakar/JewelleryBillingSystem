const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1800,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    ipcMain.handle('create-file', (request, data) => {
        
    });
    win.loadFile('src/mainpage.html');
    // win.setFullScreen(true);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})