let orn = [];
let netTotal = [];
let wt = [];
let gr = 5600;
let mc = [];
let cgst = [];
let sgst = [];
var newsalerow = 1;


let orn1 = document.getElementById("orna1");
let netTotal1 = document.getElementById("net1");
let wt1 = document.getElementById("wei1");
let mc1 = document.getElementById("mc1");
let cgst1 = document.getElementById("cgst1");
let sgst1 = document.getElementById("sgst1");

orn.push(orn1);
wt.push(wt1);
mc.push(mc1);
cgst.push(cgst1);
sgst.push(sgst1);
netTotal.push(netTotal1);

function getTabNumber(element){
    return parseInt(element[element.length-1]) - 1;
}


document.body.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        let focusedelement = document.activeElement;
        var oprid = getTabNumber(focusedelement.id);
        if(focusedelement.id.includes("net")){
            calculate(oprid);
        }
    }
})

function calculate(oprid){
    var wgt = wt[oprid].value;
    var amt = netTotal[oprid].value;
    if(wgt == '' && amt == ''){
        console.error("Enter value in required fields");
        return;
    }
    let cost = (amt)*(100/103);
    let cst;
    if(cost < amt){
        cst = amt - cost;
    }
    else{
        cst = 0;
    }
    try{
        mac = (cost/wgt) - gr;
    } catch(error){
        console.error(error);
    }
    cst = Math.round(cst/2);
    gstamt = cst*2;
    mac = Math.round(mac);
    if(mac <= 0){
        console.error("Error in calculation of making charge");
        return;
    }

    mc[oprid].value = mac;
    cgst[oprid].value = cst;
    sgst[oprid].value = cst;
    creatTR();
    orn[oprid+1].focus();
}


function creatTR(){
    newsalerow++;
    var tableBody = document.getElementById('newSale');

    var newRow = document.createElement('tr');
    var cell1 = document.createElement('td');
    var cell2 = document.createElement('td');
    var cell3 = document.createElement('td');
    var cell4 = document.createElement('td');
    var cell5 = document.createElement('td');
    var cell6 = document.createElement('td');
    var cell7 = document.createElement('td');  
    
    cell1.innerText= newsalerow;
    cell1.id = "sino";
    newRow.appendChild(cell1);
    
    input = document.createElement('input');
    input.type = 'text';
    input.id = "orna" + String(newsalerow);
    cell2.appendChild(input);
    newRow.appendChild(cell2);
    orn.push(input);
    
    input = document.createElement('input');
    input.type = 'number';
    input.id = "wei" + String(newsalerow);
    cell3.appendChild(input);
    newRow.appendChild(cell3);
    wt.push(input);
    
    input = document.createElement('input');
    input.type = 'number';
    input.id = "mc" + String(newsalerow);
    input.disabled = true;
    cell4.appendChild(input);
    newRow.appendChild(cell4);
    mc.push(input);
    
    input = document.createElement('input');
    input.type = 'number';
    input.id = "sgst" + String(newsalerow);
    input.disabled = true;
    cell5.appendChild(input);
    newRow.appendChild(cell5);
    sgst.push(input);
    
    input = document.createElement('input');
    input.type = 'number';
    input.id = "cgst" + String(newsalerow);
    input.disabled = true;
    cell6.appendChild(input);
    newRow.appendChild(cell6);
    cgst.push(input);

    input = document.createElement('input');
    input.type = 'number';
    input.id = "net" + String(newsalerow);
    cell7.appendChild(input);
    newRow.appendChild(cell7);
    netTotal.push(input);

    tableBody.appendChild(newRow);

}