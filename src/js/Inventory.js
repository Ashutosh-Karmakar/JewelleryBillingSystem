var rownumber               = 0;
var addButton               = document.getElementById("add");
var clearButton             = document.getElementById("clear");
var refreshBtn              = document.getElementById("refresh");

var catDropdown             = document.getElementById("catDropdown");
var wtinput                 = document.getElementById("wtinput");
var qtyinput                = document.getElementById("qtyinput");
var inventoryDate           = [];
var categoryDict            = {};

catDropdown.focus();

window.addEventListener("DOMContentLoaded", async () => {
    let groups = [];
    // await bridge.populateCategory();

    const fileName = "../data/inventoryData.csv";
    await fetch(fileName)
        .then(res => {
        return res.text();
        }).then(data => {
            data = data.split('-');
            data.forEach(line => {
                let cat   = line.split(',')[0];
                let catid = parseInt(line.split(',')[1]);
                let wt = parseInt(line.split(',')[2]);
                let quty = parseInt(line.split(',')[3]);
                if(cat != ""){
                    inventoryDate.push({
                        category : cat,
                        id : catid,
                        weight : wt,
                        qty: quty
                    });
                    categoryDict[cat] = [catid, wt, quty];
                }
            });
            inventoryDate.forEach((data) => {
                inventoryAddition(data);
                groups.push(data.category);
            }); 
              
        });
        await populateParentDropDown(groups);
});

let refreshFunc = async () => {
    await bridge.populateCategory();
}

document.body.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        let focusedelement = document.activeElement;
        if(focusedelement.id.includes("qtyinput")){
            // inventoryAddition(d);
        }
    }
});
document.body.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        window.location.href = "D:/cpad/BillingSystem/src/mainpage.html";
    }
});

addButton.addEventListener('click', async () => {
    let inventoryData = {
        category : categoryDict[catDropdown.value][0],
        weight: (categoryDict[catDropdown.value][1] + parseInt(wtinput.value)),
        qty: (categoryDict[catDropdown.value][2] + parseInt(qtyinput.value))
    }

    await bridge.sendinventoryData(inventoryData);
    // inventoryData.category = catDropdown.value;
    // inventoryAddition(inventoryData);
});

clearButton.addEventListener('click', clear);

refresh.addEventListener('click', refreshFunc);



function inventoryAddition(data){
    let wt = data.weight;
    let qty = data.qty;
    let cat = data.category;

    if(wt == "" || qty == 0 || cat == 0){
        console.error("The values are empty");
        return;
    }
    rownumber++;
    var tableBody = document.getElementById('logs');

    var newRow = document.createElement('tr');
 
    var cell1 = document.createElement('td');
    var cell2 = document.createElement('td');
    var cell3 = document.createElement('td');
    var cell4 = document.createElement('td');
    var cell5 = document.createElement('td');

    cell1.innerText= rownumber;
    newRow.appendChild(cell1);

    let lable = document.createElement('lable');
    lable.textContent = cat;
    cell2.appendChild(lable);
    newRow.appendChild(cell2);
    
    lable = document.createElement('lable');
    lable.textContent = wt;
    cell3.appendChild(lable);
    newRow.appendChild(cell3);
    
    lable = document.createElement('lable');
    lable.textContent = qty;
    cell4.appendChild(lable);
    newRow.appendChild(cell4);

    tableBody.appendChild(newRow);

    clear();

}

function clear() {
    catDropdown.value = "";
    wtinput.value = "";
    qtyinput.value = "";
    catDropdown.focus();
}

async function populateParentDropDown(data){
    const dropdown = document.getElementById('catDropdown');
    data.forEach(d => {
        const option = document.createElement('option');
        option.value = d; // Assuming each fruit has an ID
        option.textContent = d;
        dropdown.appendChild(option);
    });
}