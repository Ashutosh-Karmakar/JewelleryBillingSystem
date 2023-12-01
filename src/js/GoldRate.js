let rate = document.getElementById("rateinput");
let rateDisplay = document.getElementById("ratedisplay");
document.getElementById("submitbtn").addEventListener('click' ,async () => {
    await bridge.sendGoldRate(rate.value);
    rateDisplay.innerText = rate.value;
});
document.getElementById("clear").addEventListener('click', ()=>{
    rate.value = '';
});
document.body.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        window.location.href = "D:/cpad/BillingSystem/src/mainpage.html";
    }
});