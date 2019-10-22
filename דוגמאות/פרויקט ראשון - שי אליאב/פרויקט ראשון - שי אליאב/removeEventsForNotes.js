function addEventsToEachNote(){
    var contDivArr = document.getElementsByClassName("containerDiv").length;
    for (var g=0;g<contDivArr;g++){
        const currObject = document.getElementsByClassName("containerDiv")[g];
        currObject.setAttribute("onmouseover", `removeNote(${g})`);
        currObject.setAttribute("onmouseleave", "backToNormal(" + g + ")");
    }
}

function removeNote(iC){
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "glyphicon glyphicon-remove");
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("onclick", `finalRemoval(${iC});addEventsToEachNote();`);
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pinoutwithshadow.png');");
}

function backToNormal(iC){
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "iAmClassless");
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pininwithshadow.png');");

}

function finalRemoval(indexToDelete){
    var notesList = document.getElementsByClassName("aba");
    notesList[indexToDelete].remove();

    notesArr.splice(indexToDelete, 1);
    var currArrayToSave = JSON.stringify(notesArr);
    localStorage.setItem(LOCAL_STORAGE_NOTES, currArrayToSave);
}
