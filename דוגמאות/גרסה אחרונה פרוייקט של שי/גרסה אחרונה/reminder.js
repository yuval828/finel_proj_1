var remindersArr = new Array();
var tempRT;


function positionReminderSetUp(){
    var divTag = document.createElement("div");
    document.getElementById("positionReminderSetUpAba").appendChild(divTag); 
    divTag.setAttribute("id", "positionReminderSetUp");
    divTag.innerHTML =
    `<span class="removeSetTimer glyphicon glyphicon-remove" onclick="removeSetTimer();"></span> | 
     <input type="time" name="timeOfReminder" id="timeOfReminder" class="inputstyle" onkeyup="saveCurrFormStateToLocalStorage();">
     <input type="date" name="dateOfReminder" id="dateOfReminder" class="inputstyle" onkeyup="saveCurrFormStateToLocalStorage();">`
    fillReminderInfoInForm();
}

function removeSetTimer(){
        document.getElementById("positionReminderSetUpAba").innerHTML = ``;
        document.getElementById("checkForReminder").innerHTML =
            `<input type="checkbox" name="checkForReminder" class="checkForReminder" id="checkMe" onclick="positionReminderSetUp();">`;
    }

function prepareToSetAReminder(contentOfTask, timeOfTask, dateOfTask){
var ND = dateOfTask;
var NT = timeOfTask;
var contentOfTask = contentOfTask;
var RD = document.getElementById("dateOfReminder").value;
var RT = document.getElementById("timeOfReminder").value;
const noteNum = notesArr.length;


willISetAReminder = true;
willISetAReminder = willISetAReminder && reminderContentValidation(RD);
willISetAReminder = willISetAReminder && reminderDateValidation(ND, NT, RD, RT);

    if (willISetAReminder){
        RT = getReminderFormattedTime(RT);
        var ReminderDateToReverse = RD.split("-");
        var reversedDateOfReminder = ReminderDateToReverse.reverse();
        reversedDateOfReminder = ReminderDateToReverse.join("-");
        RD = reversedDateOfReminder ;
        actuallySetAReminder(RD, RT, noteNum ,contentOfTask, ND, NT, (remindersArr.length+1));
    }
}

function refreshReminderLog(){
    document.getElementById("reminderLogAba").innerHTML = "";
    fillRemindersArr();    
    addAllRemindersToDOM();
    addEventsToEachReminder();
}


function actuallySetAReminder(RD, RT, noteNum ,contentOfTask, ND, NT, reminderIndex){
    addNewReminderToDOM(RD, RT, noteNum ,contentOfTask, ND, NT, reminderIndex);
    addEventsToEachReminder();
    AddReminderToListAndLocalStorage(RD, RT, noteNum ,contentOfTask, ND, NT, reminderIndex);
}

function displayOverlayCloseButton(noteNum){
    document.getElementById(`reminderForNote${noteNum}`).style.display = "block";
}

function dontDisplayOverlayCloseButton(){
    document.getElementById(`reminderForNote${noteNum}`).style.display = "none";
}

function addNewReminderToDOM(RD, RT, noteNum ,contentOfTask, ND, NT, reminderIndex){

    var divTag = document.createElement("div");
    document.getElementById("reminderLogAba").appendChild(divTag); 
    divTag.setAttribute("class", "reminderLog");
    divTag.innerHTML =
            `
            <table>
                <tr>
                    <div class="overlayCloseButtonForReminders" id="reminderForNote${noteNum}" onmouseover="displayOverlayCloseButton();" onmouseout="dontDisplayOverlayCloseButton();">
                        <td rowspan="2">
                            <div>
                                
                                    <div>
                                    <span name="ReminderSpanForCancel" class="iAmClassless"></span>
                                    </div>
                                    <b>
                                        &nbsp; ${(reminderIndex)} &nbsp; &nbsp; &nbsp;
                                    </b>
                                
                            </div>
                        </td>
                    </div>
                    <td>
                        <b>
                            <span style="background-color: rgba(255, 255, 255, 0.774);">
                                | Task number ${noteNum} is: ${contentOfTask}. It's on ${ND}, at ${NT}.
                            </span>
                        </b>
                        </br>
                        <span>
                            <b>|</b> A reminder is set to: ${RD}, at: ${RT}
                        </span>
                    </td>
                </tr>
            
            `
}

function addEventsToEachReminder(){
    var contReminderDivArr = document.getElementsByClassName("reminderLog").length;
    for (var q=0;q<contReminderDivArr;q++){
        const currReminderObject = document.getElementsByClassName("reminderLog")[q];
        currReminderObject.setAttribute("onmouseover", `removeReminder(${q})`);
        currReminderObject.setAttribute("onmouseleave", "reminderBackToNormal(" + q + ")");
    }
}

function removeReminder(iCR){
    document.getElementsByName("ReminderSpanForCancel")[iCR].setAttribute("class", "glyphicon glyphicon-remove");
    document.getElementsByName("ReminderSpanForCancel")[iCR].setAttribute("onclick", `reminderFinalRemoval(${iCR});addEventsToEachReminder();`);
}

function reminderBackToNormal(iCR){
    document.getElementsByName("ReminderSpanForCancel")[iCR].setAttribute("class", "iAmClassless");
}

function reminderFinalRemoval(indexToDelete){
    var remindersList = document.getElementsByClassName("reminderLog");
    remindersList[indexToDelete].remove();

    remindersArr.splice(indexToDelete, 1);
    resetReminderIndexInLocalStorage();
    var currRemindersArrayToSave = JSON.stringify(remindersArr);
    localStorage.setItem(LOCAL_STORAGE_REMINDERS, currRemindersArrayToSave);
    refreshReminderLog();
}

function resetReminderIndexInLocalStorage(){
    for (var i=0;i<remindersArr.length;i++){
        const reminderObj = remindersArr[i];
        reminderObj.reminderIndex = i+1;
    }
}

function removeReminderWhenItsNoteIsRemoved(numberOfDeletedNote){
for (var i=0;i<remindersArr.length;i++){
    if (remindersArr[i].noteNumber==(numberOfDeletedNote+1)){
        remindersArr.splice(i, 1);
        resetReminderIndexInLocalStorage();
        var currRemindersArrayToSave = JSON.stringify(remindersArr);
        localStorage.setItem(LOCAL_STORAGE_REMINDERS, currRemindersArrayToSave);
        refreshReminderLog();
        }
    }
}

function AddReminderToListAndLocalStorage(RD, RT, noteNum ,contentOfTask, ND, NT, reminderIndex) {
    const saveToRemindersJsonDB = { noteNumber: noteNum,
                                    contentOfTask: contentOfTask,
                                    timeOfTask: NT,
                                    dateOfTask: ND,
                                    reminderTime: RT,
                                    reminderDate: RD,
                                    reminderIndex: reminderIndex};

    remindersArr.push(saveToRemindersJsonDB);

    const RemindersToPush = JSON.stringify(remindersArr);
    localStorage.setItem(LOCAL_STORAGE_REMINDERS, RemindersToPush);
}


function reminderDateValidation(ND, NT, RD, RT){
    const currDate = new Date();

    let taskDateToCheck = new Date(RD);
    if(RT) {
        taskDateToCheck = new Date(RD + " " + RT);
    }
    
    return taskDateValidation(currDate, RD, RT) && taskDateValidation(taskDateToCheck, ND, NT)
}

function reminderContentValidation(inputBeingChecked){
    if (inputBeingChecked==""){
        return false;
    }
    return true;
}


function getReminderFormattedTime(inputTime){
    if (inputTime==""){
        var timeText = "00:00";
    } else {
        timeText = inputTime;
    }
    return timeText;
}
