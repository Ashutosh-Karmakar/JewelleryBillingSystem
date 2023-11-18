var groupName = document.getElementById("groupNameinput");
var parentGroup = document.getElementById("Parentinput");

document.getElementById("add").addEventListener('click', async () => {
    await bridge.sendGroupData({
        groupData : {
            group: groupName.value,
            parent: parentGroup.value
        }
    });
});

document.getElementById("clear").addEventListener('click', () =>{
    groupName.value = "";
    parentGroup.value = "";
});