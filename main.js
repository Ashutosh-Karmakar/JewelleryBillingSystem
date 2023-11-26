const { app, BrowserWindow, ipcMain } = require('electron');
const path                            = require('path');
const mySql                           = require("mysql");
const CustMod                         = require("./modules/customerModel");
const AddMod                          = require("./modules/additionalModule");
const BillMod                         = require("./modules/billModule");
const ItemMod                         = require("./modules/itemCheckoutModule");
const InvtMod                         = require("./modules/inventoryModule");
const fs                              = require("fs");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1800,
        height: 900,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
        }
    });
    ipcMain.handle('SendData', SendData);
    ipcMain.handle('sendGroupData', sendGroupData);
    ipcMain.handle('populateCategory', populateCategory);
    ipcMain.handle('sendinventoryData', sendinventoryData);
    ipcMain.handle('getCustDetails', getCustDetails);

    ipcMain.handle('something', something);

    win.loadFile('src/mainpage.html');  
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})

async function SendData(request, custdata, itemData , additionalData, modeNTotal, productWt){
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
        var custId = await CustMod.Find(custdata);
    }
    // Create a bill with nofitemas and customer id
    var noOfEntries = itemData.orna.length;
    await BillMod.CreateBillNoItemCustID(noOfEntries, custId);
    // insert the itemcheckout details
    await ItemMod.Create(noOfEntries, billId, itemData);
    //update the inventory
    await InvtMod.UpdateAfterSaleInventory(productWt);
    // insert the additionaldatat into the db
    await AddMod.Create(billId, additionalData);
    // insert mode and total in db
    await BillMod.UpdateModeNTotal(billId, modeNTotal);    
}

async function getCustDetails(request, phNo) {
    let custdetails = await CustMod.FindCustDetails(phNo);
    return custdetails;
};

function something(request) {
    console.log("hello");
};

let populateCategory = async (request) => {
    // console.log("hello");
    var result = await InvtMod.Read();
    let inventoryData = "";
    if(result.length == 0){
        return;
    }
    result.forEach(element => {
        inventoryData += element.Category + "," + element.ProductID + "," + (element.Weight?element.Weight:0) + "," + (element.Quantity?element.Quantity:0) + "-"; 
    });    
    console.log(inventoryData);
    
    fs.writeFile("./data/inventoryData.csv", inventoryData, (err) => {
        if(err){
            console.error("Error while writing to the file in inventory.csv");
            return;
        }
        console.log("Inventory.csv writing Success");
    })
}

populateCategory();

let sendGroupData = (request, groupData) => {
    InvtMod.Create(groupData);
}

let sendinventoryData = (request, inventoryData) => {
    InvtMod.Update(inventoryData.category, inventoryData.weight, inventoryData.qty);
}
