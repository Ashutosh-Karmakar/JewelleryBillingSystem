let orn = [];
let netTotal = [];
let wt = [];
let gr = 5600;
let mc = [];
let cgst = [];
let sgst = [];
var newsalerow = 1;
let custName = document.getElementById("Name")
let custPhno = document.getElementById("PhNo")
let custadhr = document.getElementById("Aadhar")
let custaddr = document.getElementById("addr")
var tableBody = document.getElementById('newSale');
var newRowAdded = [];
let orn1 = document.getElementById("orna1");
let netTotal1 = document.getElementById("net1");
let wt1 = document.getElementById("wei1");
let mc1 = document.getElementById("mc1");
let cgst1 = document.getElementById("cgst1");
let sgst1 = document.getElementById("sgst1");
const payableinput = document.getElementById("TotalPayableinput");
var adddropdowns = [];
var addamts = [];

orn.push(orn1);
wt.push(wt1);
mc.push(mc1);
cgst.push(cgst1);
sgst.push(sgst1);
netTotal.push(netTotal1);
adddropdowns.push(document.getElementById("addodeduct1"));
addamts.push(document.getElementById("addtotal1"));
adddropdowns.push(document.getElementById("addodeduct2"));
addamts.push(document.getElementById("addtotal2"));
adddropdowns.push(document.getElementById("addodeduct3"));
addamts.push(document.getElementById("addtotal3"));

function getTabNumber(element){
    return parseInt(element[element.length-1]) - 1;
}


document.body.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        calculate();
        additionalCalc();
    }
})


document.getElementById("saveBill").addEventListener("click", () => {
    // sendCustData();
    // sendItemData();
    // sendadditionalData();
    // sendModeNTotal();
    callingmainmethod();
 });

 document.getElementById("gstReport").addEventListener("click", () => {
    clear();
 });



 var callingmainmethod = async () => {
    if(custName.value === "" || custPhno.value === "" || custadhr.value === "" || custaddr.value === ""){
        return;
    }
    let custdata = {
        name: custName.value,
        phno: custPhno.value,
        adhr: custadhr.value,
        addr: custaddr.value
    }
    var itemData = {
        orna : [],
        wgt  : [],
        mrc   : [],
        cgt : [],
        sgt : [],
        net  : []
    }

    for(let i=0; i<netTotal.length; i++){
        if(orn[i].value === "" || wt[i].value === "" 
            || mc[i].value === "" || cgst[i].value === "" || sgst[i].value === "" || netTotal[i].value === ""){
                break;
        }
        console.log(orn[i].value);
        itemData.orna.push(orn[i].value);
        itemData.wgt.push(wt[i].value);
        itemData.mrc.push(mc[i].value);
        itemData.cgt.push(cgst[i].value);
        itemData.sgt.push(sgst[i].value);
        itemData.net.push(netTotal[i].value);
    }

    var additionalData = {
        additiontype : [],
        additionamt  : []
    }
    for(let i=0; i<addamts.length; i++){
        if(addamts[i].value === ""){
            break;
        }
        additionalData.additiontype.push(adddropdowns[i].value);
        additionalData.additionamt.push(addamts[i].value);
    }

    let modeNTotal = {
        mode  : document.getElementById("mode").value,
        total : payableinput.value
    }
    await bridge.SendData(custdata, itemData, additionalData, modeNTotal);
 }
 
 let clear = () => {
    orn.push(orn1);
    wt.push(wt1);
    mc.push(mc1);
    cgst.push(cgst1);
    sgst.push(sgst1);
    netTotal.push(netTotal1);

    orn[0].value      = "";
    wt[0].value       = "";
    mc[0].value       = "";
    cgst[0].value     = "";
    sgst[0].value     = "";
    netTotal[0].value = "";

    custName.value = "";
    custPhno.value = "";
    custadhr.value = "";
    custaddr.value = "";

    newRowAdded.forEach(function (row) {
        tableBody.removeChild(row);
    });
    newsalerow = 1
    payableinput.value = "";
 }

 const additionalCalc = () => {
    let payable = payableinput.value;
    if(payable === ""){
        return;
    }
    payable = parseInt(payable);
    let focusedelement = document.activeElement;
    if(!focusedelement.id.includes("addtotal")){
        return;
    }


    var oprid = parseInt(focusedelement.id[focusedelement.id.length - 1]) - 1;
    if(adddropdowns[oprid].value === "Old Ornament"){
        let addamt = parseInt(addamts[oprid].value);
        payable = payable - addamt;
    }
    else if(adddropdowns[oprid].value === "Additional Charges"){
        let addamt = parseInt(addamts[oprid].value);
        payable = payable + addamt;
    }
    payableinput.value = payable;
 }

 function calculate(){
    let focusedelement = document.activeElement;
    if(!focusedelement.id.includes("net")){
        return;
    }
    var oprid = getTabNumber(focusedelement.id);
    var wgt = wt[oprid].value;
    var amt = netTotal[oprid].value;
    if(wgt == '' && amt == ''){
        console.error("Enter value in required fields");
        return;
    }
    wgt = parseInt(wgt);
    amt = parseInt(amt);
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
    if(payableinput.value === ""){
        payableinput.value = amt;
    }
    else{
        let totalPayable = parseInt(payableinput.value);
        payableinput.value = "";
        payableinput.value = totalPayable + amt;
    }
    createNewSaleInputs();
    orn[oprid+1].focus();
}


function createNewSaleInputs(){
    newsalerow++;
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
    var data = ["GRing", "SRing", "GChain"];

    let ornaDropdown = document.createElement('select');
    ornaDropdown.id = "orna" + String(newsalerow);
    data.forEach(d => {
        const option = document.createElement('option');
        option.value = d; // Assuming each fruit has an ID
        option.textContent = d;
        ornaDropdown.appendChild(option);
    });
    cell2.appendChild(ornaDropdown);
    newRow.appendChild(cell2);
    orn.push(ornaDropdown);


    // let input = document.createElement('input');
    // input.type = 'text';
    // input.id = "orna" + String(newsalerow);
    // cell2.appendChild(input);
    // newRow.appendChild(cell2);
    // orn.push(input);
    
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
    newRowAdded.push(newRow);

}
