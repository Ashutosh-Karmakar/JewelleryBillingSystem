const { app, BrowserWindow, ipcMain } = require('electron');
const path                            = require('path');
var mySql                             = require("mysql");
var CustMod                           = require("./modules/customerModel");
var AddMod                            = require("./modules/additionalModule");
var BillMod                           = require("./modules/billModule");
var ItemMod                           = require("./modules/itemCheckoutModule");
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
    ipcMain.handle('SendData', SendData);

    win.loadFile('src/mainpage.html');
    // win.setFullScreen(true);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})


async function SendData(request, custdata, itemData , additionalData, modeNTotal){
    console.log("sendDatat");
    // get the billid
    var billId = await BillMod.FindBillNo();
    console.log(billId);
    //get customer id
    var custId = await CustMod.Find(custdata);
    console.log(custId);
    //if not add customer and then get a id
    if(custId == 0){
        await CustMod.Create(custdata);
    }
    // Create a bill with nofitemas and customer id
    var noOfEntries = itemData.orna.length;
    await BillMod.CreateBillNoItemCustID(noOfEntries, custId);
    // insert the itemcheckout details
    await ItemMod.Create(noOfEntries, billId, itemData);
    // insert the additionaldatat into the db
    await AddMod.Create(billId, additionalData);
    // insert mode and total in db
    await BillMod.UpdateModeNTotal(billId, modeNTotal);
}

let sendGroupData = (request, groupData) => {
    console.log("sendGroupData");
    console.log(groupData);
}

let sendinventoryData = (request, inventoryData) => {
    console.log("sendinventoryData");
    console.log(inventoryData);
}
