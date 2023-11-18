var rownumber = 0;
var addButton = document.getElementById("add");
var clearButton = document.getElementById("clear");

var catinput = document.getElementById("catinput");
var wtinput = document.getElementById("wtinput");
var qtyinput = document.getElementById("qtyinput");

catinput.focus();

document.body.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        let focusedelement = document.activeElement;
        if(focusedelement.id.includes("qtyinput")){
            logAddition();
        }
    }
});

addButton.addEventListener('click', async () => {
    await bridge.sendinventoryData({
        inventoryData : {
            category : catinput.value,
            weight: wtinput.value,
            qty: qtyinput.value
        }
    });
    logAddition();
});
clearButton.addEventListener('click', clear);

function logAddition(){
    let wt = wtinput.value;
    let qty = qtyinput.value;
    let cat = catinput.value;

    if(wt == "" || qty == "" || cat == ""){
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
    catinput.value = "";
    wtinput.value = "";
    qtyinput.value = "";
    catinput.focus();
}