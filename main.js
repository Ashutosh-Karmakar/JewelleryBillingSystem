const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var mySql = require("mysql");
const connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db",
    auth_plugin: "mysql_native_password"

});;
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1800,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
        }
    });
    ipcMain.handle('dbConnection', dbConnection);
    ipcMain.handle('saveCustomer', saveCustomer);
    ipcMain.handle('saveItemDetails', saveItemDetails);
    ipcMain.handle('sendadditionalData', sendadditionalData);
    ipcMain.handle('sendModeNTotal', sendModeNTotal);
    ipcMain.handle('sendGroupData', sendGroupData);
    ipcMain.handle('sendinventoryData', sendinventoryData);


    win.loadFile('src/mainpage.html');
    // win.setFullScreen(true);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})

let dbConnection = () => {
    connection.connect((err) => {
        if(err){
            return console.log(err);
        }
        console.log("Connection Successfull");
    });
    //execution of querries
    // connection.end(() => {
    //     console.log("Conenction is ended here");
    // })
};

let saveCustomer = (request, custData) => {
    console.log("saveCustomer");
    console.log(custData);
}

let saveItemDetails = (request, itemData) => {
    console.log("saveItemDetails");
    console.log(itemData);
}

let sendadditionalData = (request, additionalData) => {
    console.log("additionalData");
    console.log(additionalData);
}

let sendModeNTotal = (request, modeNTotal) => {
    console.log("sendModeNTotal");
    console.log(modeNTotal);
}

let sendGroupData = (request, groupData) => {
    console.log("sendGroupData");
    console.log(groupData);
}


let sendinventoryData = (request, inventoryData) => {
    console.log("sendinventoryData");
    console.log(inventoryData);
}

