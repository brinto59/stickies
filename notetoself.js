//you can use sessionStorage instead of localStorage then all the items from the localstorage are removed when the browser is closed.
window.onload = init;
function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var stickyObj = JSON.parse(localStorage.getItem(key));
        addStickyToDOM(key,stickyObj);
    }
}
function addStickyToDOM(key,stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id",key);
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;
    sticky.style.backgroundColor=stickyObj.color;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick=deleteSticky;
}
function createSticky() {
    var currentTime=new Date();
    var key="sticky_"+currentTime.getTime();
    var value = document.getElementById("note_text").value;
    var colorSelectObj=document.getElementById("note_color");
    var index=colorSelectObj.selectedIndex;
    var color=colorSelectObj[index].value;

    var stickyObj={
        value:value,
        color:color        
    }

    localStorage.setItem(key, JSON.stringify(stickyObj));

    var stickiesArray=getStickiesArray();
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    
    addStickyToDOM(key,stickyObj);
}
function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
    else {
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}
function deleteSticky(e){
    var key=e.target.id;
    if(e.target.tagName.toLowerCase()=="span"){
        key=e.target.parentNode.id;//when you clicked on the text that is inside the span tag. so we have to get the id that is with the parent tag li
    }
    localStorage.removeItem(key);
    var stickiesArray=getStickiesArray();
    if(stickiesArray){
        for(var i=0;i<stickiesArray.length;i++){
            if(key==stickiesArray[i]){
                stickiesArray.splice(i,1);
            }
        }
        localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
    }
}
function removeStickyFromDOM(key){
    var sticky=document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}