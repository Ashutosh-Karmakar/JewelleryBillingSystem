
document.body.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        window.close();
    }
});
window.addEventListener("DOMContentLoaded", async () => {
    await bridge.populateCategory();
});