var groupName               = document.getElementById("groupNameinput");
// var parentGroup          = document.getElementById("Parentinput");
var tableBody               = document.getElementById("groups");
var groups                  = [];
// var refreshBtn = document.getElementById("refresh");

window.addEventListener("DOMContentLoaded", async () => {
    await bridge.populateCategory();
    const fileName = "../data/inventoryData.csv";
    let onload = await fetch(fileName)
    .then(res => {
       return res.text();
    }).then(data => {
        data = data.split('-');
        data.forEach(line => {
            let key   = line.split(',')[0];
            if(key != ""){
                groups.push(key);
            }
        });   
    });
    await groups.forEach((ele) => {
        populateProductGroup(ele);
    })
    
    
});

// let refreshFunc = async () => {
//     await bridge.populateCategory();
// }

// refreshBtn.addEventListener('click', refreshFunc);

document.body.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        window.location.href = "D:/cpad/BillingSystem/src/mainpage.html";
    }
});

document.getElementById("add").addEventListener('click', async () => {
    await bridge.sendGroupData(groupName.value);
    
    populateProductGroup(groupName.value);
});

document.getElementById("clear").addEventListener('click', () =>{
    groupName.value = "";
});

function populateProductGroup(ele) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerText = ele;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = "Primary";
    tr.appendChild(td);
    
    tableBody.appendChild(tr);
}