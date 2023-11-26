const { contextBridge, ipcMain, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("bridge", {
    SendData: (custdata, itemData , additionalData, modeNTotal, productWt) => ipcRenderer.invoke("SendData", custdata, itemData , additionalData, modeNTotal, productWt),
    populateCategory: () => ipcRenderer.invoke("populateCategory"),
    sendGroupData: (groupData) => ipcRenderer.invoke("sendGroupData", groupData),
    sendinventoryData: (inventoryData) => ipcRenderer.invoke("sendinventoryData", inventoryData),
    getCustDetails: (phNo) => ipcRenderer.invoke("getCustDetails", phNo), 
    

});


