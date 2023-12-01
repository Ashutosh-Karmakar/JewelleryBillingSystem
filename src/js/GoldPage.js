let orn                     = [];
let netTotal                = [];
let wt                      = [];
let gr                      = 5600;
let mc                      = [];
let cgst                    = [];
let sgst                    = [];
var newsalerow              = 1;
let custName                = document.getElementById("Name")
let custPhno                = document.getElementById("PhNo")
let custadhr                = document.getElementById("Aadhar")
let custaddr                = document.getElementById("addr")
var tableBody               = document.getElementById('newSale');
var newRowAdded             = [];
let orn1                    = document.getElementById("orna1");
let netTotal1               = document.getElementById("net1");
let wt1                     = document.getElementById("wei1");
let mc1                     = document.getElementById("mc1");
let cgst1                   = document.getElementById("cgst1");
let sgst1                   = document.getElementById("sgst1");
const payableinput          = document.getElementById("TotalPayableinput");
const rateInput             = document.getElementById("rate");
var adddropdowns            = [];
var addTotal                = [];
var addNetTotal             = [];
var categoryType            = {};
let productWt               = [];
orn.push(orn1);
wt.push(wt1);
mc.push(mc1);
cgst.push(cgst1);
sgst.push(sgst1);
netTotal.push(netTotal1);

adddropdowns.push(document.getElementById("addodeduct1"));
addTotal.push(document.getElementById("addtotal1"));
adddropdowns.push(document.getElementById("addodeduct2"));
addTotal.push(document.getElementById("addtotal2"));
adddropdowns.push(document.getElementById("addodeduct3"));
addTotal.push(document.getElementById("addtotal3"));

addNetTotal.push(document.getElementById("addNetTotal1"));
addNetTotal.push(document.getElementById("addNetTotal2"));
addNetTotal.push(document.getElementById("addNetTotal3"));


//behaviour on load or reload
document.addEventListener('DOMContentLoaded', async () => {
    // await bridge.populateCategory();
    const fileName = "../data/inventoryData.csv";
    await fetch(fileName)
    .then(res => {
       return res.text();
    }).then(data => {
        data = data.split('-');
        gr = parseInt(data[0].split(',')[1]);
        rate.value = gr;
        for(var i=1 ; i<data.length ; i++){
            var line = data[i];
            let category   = line.split(',')[0];
            let id = parseInt(line.split(',')[1]);
            let weight = parseInt(line.split(',')[2]);
            let qty = parseInt(line.split(',')[3]);
            if(category != "" && weight != 0 && qty != 0){
                categoryType[category] = [id, weight, qty];
            }
        }   
    });    
    let orna1Dropdown = document.getElementById('orna1');
    addOrnmentOptions(orna1Dropdown);
});

//behaviour on Enter click
document.body.addEventListener('keydown', async function(event){
    if(event.key === "Enter"){
        if(document.activeElement.id == "PhNo"){
            let custDetails = await bridge.getCustDetails(custPhno.value);
            if(custDetails != 0){
                custName.value = custDetails.CustName;
                custaddr.value = custDetails.Address;
                custadhr.value = custDetails.Aadhaar;
                orn1.focus();
            }
            else{
                custName.focus();
            }
        }
        if(document.activeElement.id.includes("addtotal")){
            let focusedelement = document.activeElement;
            let index = parseInt(focusedelement.id[focusedelement.id.length - 1]) - 1;
            if(adddropdowns[index].value == "Old Ornament"){
                addNetTotal[index].innerText = "- " + addTotal[index].value;
            }
            if(adddropdowns[index].value == "Additional Charges"){
                addNetTotal[index].innerText = "+ " + addTotal[index].value;
            }
        }
        calculate();
        additionalCalc();
    }
})

//behaviour on Escape enter
document.body.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        window.location.href = "D:/cpad/BillingSystem/src/mainpage.html";
    }
});

//behaviour on save btn click
document.getElementById("saveBill").addEventListener("click", () => {
    let flag = true;
    if(custName.value === "" || custPhno.value === "" || custadhr.value === "" || custaddr.value === ""){
        // return;
        flag = false;
    }
    addTotal.forEach((element) => {
        let index = parseInt(element.id[element.id.length - 1]) - 1;
        if(element.value != "" && addNetTotal[index].innerText == ""){
            console.error("Enter not clicked on add total ");
            // return;
            flag = false;
        }
    })
    if(flag)
        callingmainmethod();
 });

 //behaviour on clear btn click
 document.getElementById("gstReport").addEventListener("click", () => {
    clear();
 });


// function getTabNumber(element){
//     return parseInt(element[element.length-1]) - 1;
// }

function addOrnmentOptions(orna1Dropdown) {
    Object.keys(categoryType).forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = d;
        orna1Dropdown.appendChild(option);
    });
}

let findPayableAmt = () => {
    let totalpayableAmt = 0;
    let index = 0;
    netTotal.forEach((element) => {
        if(mc[index].value != "") {
            totalpayableAmt += parseInt(element.value);     
        }
        index++;
    });
    addNetTotal.forEach((element) => {
        if(element.innerText != ""){
            if(element.innerText.substr(0,1) == '-'){
                totalpayableAmt -= parseInt(element.innerText.substr(2,element.innerText.length-1));
            }
            else{
                totalpayableAmt += parseInt(element.innerText.substr(2,element.innerText.length-1));
            }
            console.log(parseInt(element.innerText));
        }
    });
    return totalpayableAmt;
}

 
 const additionalCalc = () => {
    let payable = findPayableAmt();
    if(payable == 0){
        return;
    }
    payableinput.value = payable;
 }

 function calculate(){
    let focusedelementId = document.activeElement.id;
    if(!focusedelementId.includes("net")){
        return;
    }
    var oprid = parseInt((focusedelementId)[focusedelementId.length-1]) - 1;
    // getTabNumber(focusedelement.id);
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
    payableinput.value = "";
    totalPayable = parseInt(payableinput.value);
    payableinput.value = findPayableAmt();
    categoryType[orn[oprid].value][1] -= wgt;
    categoryType[orn[oprid].value][2] -= 1;
    productWt.push({
        catId: categoryType[orn[oprid].value][0],
        catWt: categoryType[orn[oprid].value][1],
        catQt: categoryType[orn[oprid].value][2]
    });
    if(oprid == orn.length - 1)
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

    let ornaDropdown = document.createElement('select');
    ornaDropdown.id = "orna" + String(newsalerow);
    addOrnmentOptions(ornaDropdown);
    cell2.appendChild(ornaDropdown);
    newRow.appendChild(cell2);
    orn.push(ornaDropdown);
    
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



var callingmainmethod = async () => {
    
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
        itemData.orna.push(categoryType[orn[i].value][0]);
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
    for(let i=0; i<addTotal.length; i++){
        if(addTotal[i].value === ""){
            break;
        }
        additionalData.additiontype.push(adddropdowns[i].value);
        additionalData.additionamt.push(addTotal[i].value);
    }

    let modeNTotal = {
        mode  : document.getElementById("mode").value,
        total : payableinput.value
    }    
    await bridge.SendData(custdata, itemData, additionalData, modeNTotal, productWt);
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

    // custName.value = "";
    custPhno.value = "";
    custadhr.value = "";
    custaddr.value = "";

    newRowAdded.forEach(function (row) {
        tableBody.removeChild(row);
    });
    newsalerow = 1
    payableinput.value = "";
 }
