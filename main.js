const { app, BrowserWindow, ipcMain } = require('electron');
const path                            = require('path');
const CustMod                         = require("./modules/customerModel");
const AddMod                          = require("./modules/additionalModule");
const BillMod                         = require("./modules/billModule");
const ItemMod                         = require("./modules/itemCheckoutModule");
const InvtMod                         = require("./modules/inventoryModule");
const RateMod                         = require("./modules/goldRateModule");
const fs                              = require("fs");
var rate = 5600;
const pdf = require('pdf-creator-node');
const mongoose = require("mongoose");


const url = "mongodb+srv://ashutoshkarmakar72:idOaNz7nCvWEmJde@jewellerybillingsystem.spl49dx.mongodb.net/";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log("connected DB"))
.catch((err) => console.log(err));

let ornamentCategory = {};

let FinalData = {};

const options = require('./config/pdfFormatter')
let billId = 0;


const generatePDF = async (BillNo) => {
    console.log("hello inside generate");
    const html = fs.readFileSync(path.join(__dirname, '/views/template.html'), 'utf-8');
    const filename = BillNo + '_doc' + '.pdf';
      const document = {
        html: html,
        data : {
            data: FinalData,
        },
        path: './Bills/' + filename
    }
    pdf.create(document, options)
    .then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    });
   
}

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
    ipcMain.handle('sendGoldRate', sendGoldRate);

    win.webContents.send("getBillNo", billId);

    win.loadFile('src/mainpage.html');  
}
async function getBillNo() {
    billId = await BillMod.FindBillNo();
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    mongoose.disconnect();
    console.log("Disconnecting DB.....");
    if(process.platform !== 'darwin') app.quit();
})

async function SendData(request, custdata, itemData , additionalData, modeNTotal, productWt){
    console.log("sendDatat");
    // get the billid
    var billId = await BillMod.FindBillNo();
    console.log(billId);
    //get customer id
    var custId = await CustMod.Find(custdata);
    console.log("custId");
    console.log(custId);
    //if not add customer and then get a id
    if(custId == 0){
        var custId = await CustMod.Create(custdata);
        // var custId = await CustMod.Find(custdata);
    }
    // Create a bill with nofitemas and customer id
    var noOfEntries = itemData.orna.length;
    await BillMod.CreateBillNoItemCustID(noOfEntries, custId);
    console.log("Create a bill with nofitemas and customer id done");
    // insert the itemcheckout details
    await ItemMod.Create(noOfEntries, billId, itemData);
    console.log("insert the itemcheckout details done");
    //update the inventory
    await InvtMod.UpdateAfterSaleInventory(productWt);
    console.log("update the inventory done");
    // insert the additionaldatat into the db
    if(additionalData.additiontype.length > 0){
        await AddMod.Create(billId, additionalData);
    }
    console.log("insert the additionaldatat into the db done");
    // insert mode and total in db
    await BillMod.UpdateModeNTotal(billId, modeNTotal);  
    console.log("insert mode and total in db done");
    let curdate = new Date();
    FinalData = {
        "date" : curdate.getDate() + " / " + (curdate.getMonth()+1) + " / " + curdate.getFullYear(),
        "GoldRate": rate,
        "BillId" : billId,
        "CustDetail": {
            "Phno": custdata.phno,
            "name": custdata.name,
            "Addhr": custdata.adhr,
            "Addr": custdata.addr
        },
        "ItemDetails": [],
        "AdditionCharges": [],
        "ModeOfPayment": modeNTotal.mode,
        "NetTotal": modeNTotal.total
    }
    for(let i=0; i<noOfEntries; i++){
        FinalData.ItemDetails.push({
            "si": i+1,
            "description": ornamentCategory[itemData.orna[i]],
            "hsn" : 17654,
            "wt": itemData.wgt[i],
            "mc" : itemData.mrc[i],
            "cgst" : itemData.cgt[i],
            "sgst": itemData.sgt[i],
            "total": itemData.net[i] 
        });
    }
    for(let i = noOfEntries; i<10 ; i++){
        FinalData.ItemDetails.push({
            "si": '',
            "description": '',
            "hsn" : '',
            "wt": '',
            "mc" : '',
            "cgst" : '',
            "sgst": '',
            "total": '' 
        });
    }
    console.log("hello4");
    console.log(additionalData.additiontype.length);
    for(let i=0; i<additionalData.additiontype.length; i++){
        FinalData.AdditionCharges.push({
        "si" : i+1,
        "additionalType" : additionalData.additiontype[i],
        "additionalAmt" : additionalData.additionamt[i]
        });
    }
    for(let i=additionalData.additiontype.length; i<3 ; i++){
        FinalData.AdditionCharges.push({
            "si" : '',
            "additionalType" : '',
            "additionalAmt" : ''
            });
    }
    generatePDF(billId);
}

async function getCustDetails(request, phNo) {
    let custdetails = await CustMod.FindCustDetails(phNo);
    return custdetails;
};



let populateCategory = async (request) => {
    // console.log("hello");
    var result = await InvtMod.Read();
    var goldRate = await RateMod.Find();
   
    let inventoryData = "Rate,";
    console.log(goldRate);
    if(goldRate.length != 0){
        rate = goldRate[0].GoldRate;
    }
    inventoryData = inventoryData +  rate + "-";
    if(result.length == 0){
        return;
    }
    result.forEach(element => {
        inventoryData += element.Category + "," + element.ProductID + "," + (element.Weight?element.Weight:0) + "," + (element.Quantity?element.Quantity:0) + "-"; 
        ornamentCategory[element.ProductID] = element.Category;
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
    console.log("InvtoruDaytaUpdate");
    InvtMod.Update(inventoryData.category, inventoryData.weight, inventoryData.qty);
}

let sendGoldRate = (request, rate) => {
    RateMod.Create(rate);
}


