const { contextBridge, ipcMain, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("bridge", {
    dbConnection: () => ipcRenderer.invoke("dbConnection"),
    saveCustomer: (custData) => ipcRenderer.invoke("saveCustomer", custData),
    saveItemDetails: (itemData) => ipcRenderer.invoke("saveItemDetails", itemData),
    saveadditionalDetails: (additionalData) => ipcRenderer.invoke("sendadditionalData", additionalData),
    sendModeNTotal: (modeNTotal) => ipcRenderer.invoke("sendModeNTotal", modeNTotal),

    sendGroupData: (groupData) => ipcRenderer.invoke("sendGroupData", groupData),
    sendinventoryData: (inventoryData) => ipcRenderer.invoke("sendinventoryData", inventoryData),

});


