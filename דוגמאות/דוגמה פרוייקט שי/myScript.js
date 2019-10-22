var notes = {

}

function createTask() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    var dateArr = dateOfTask.split("-");
    var reversedDate = dateArr.reverse();
    reversedDate = dateArr.join("-");

    localStorage.setItem("contentOfTask", contentOfTask);
    localStorage.setItem("timeOfTask", timeOfTask);
    localStorage.setItem("dateOfTask", reversedDate);

    var divTag = document.createElement("div");
    document.getElementById("frameDiv1").appendChild(divTag); 
    divTag.setAttribute("class", "aba");
    divTag.innerHTML =
   `<div class="divStyle">
   <div class="containerDiv"><span name="spanForCancel" class="iAmClassless"></span>
    </br>
    <fieldset style='width:85%; height:140px; border: 1px solid black; margin-left:6px; margin-top:2px;'>
        <legend>
        To Do:
        </legend>
        <div style="width:99%;height:88px;padding:5px;border: 1px solid red ;overflow-y:scroll;" class='pContentOfTask'>
            contentOfTask
        </div>
    </fieldset>
    </br>
    <fieldset style='width:85%;height:50px;border: 1px'>
        <div style='float:left;'>
            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
            Be ready at:
            </span>
        </div>
        <div width:50%; length:50%; style='float:right;margin-right:30%;' class='pTimeOfTask'>
            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
            timeOfTask
            </span>
        </div>
        </br>
        <div style='float:left;'>
            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
            on:
            </span>
        </div>
        <div width:50%; length:50%; style='float:right;margin-right:35%' class='pDateOfTask'>
            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
            dateOfTask
            </span>
        </div>
    </fieldset>
    </div></div>`;

    divTag.getElementsByClassName("pContentOfTask")[0].innerText = contentOfTask;
    divTag.getElementsByClassName("pTimeOfTask")[0].innerText = timeOfTask;
    divTag.getElementsByClassName("pDateOfTask")[0].innerText = reversedDate;

    addToEachNote();

    var saveToJsonDB = { content: contentOfTask, time: timeOfTask, date: reversedDate};
    var noteJsonObject = JSON.stringify(saveToJsonDB);
    notes.push = noteJsonObject;

    clearForm();
}

function clearForm(){
    document.getElementById("contentOfTask").value = "";
    document.getElementById("timeOfTask").value = "";
    document.getElementById("dateOfTask").value = "";
}

//פונקציה שעוברת על כל הנוטס ושמה עליהם איוונטים. נשתמש בפונקציה זו כל פעם שמשתנה כמות הנוטס
function addToEachNote(){
    var contDivArr = document.getElementsByClassName("containerDiv").length;
    for (var g=0;g<contDivArr;g++){
        const currObject = document.getElementsByClassName("containerDiv")[g];
        currObject.setAttribute("onmouseover", `removeNote(${g})`);
        currObject.setAttribute("onmouseleave", "backToNormal(" + g + ")");
    }
}

function removeNote(iC){
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "glyphicon glyphicon-remove");
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("onclick", `finalRemoval(${iC});addToEachNote();`);
}

function backToNormal(iC){
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "iAmClassless");
}



function finalRemoval(indexToDelete){
    var notesList = document.getElementsByClassName("aba");
    notesList[indexToDelete].remove();
}