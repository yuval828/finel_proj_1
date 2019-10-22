//חסר: בוטסטרפ לגדלי מסך שונים
var notesArr = new Array();
var reminderArr = new Array();
const LOCAL_STORAGE_NOTES = "currNotes";
var personDescription = prompt("A quick survey: Complete the sentence - I am a...");

function createTask() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    var timeOfReminder = document.getElementById("timeOfReminder").value;
    var dateOfReminder = document.getElementById("dateOfReminder").value;

    //יישום הולידציה לצורך יצירת הפונקציה
    let willIcreateTask = true;
    willIcreateTask = willIcreateTask && contentValidation(contentOfTask, dateOfTask);
    willIcreateTask = willIcreateTask && taskDateValidation(dateOfTask, timeOfTask);

    let willISetAReminder = true;
    willISetAReminder = willISetAReminder && reminderDateValidation(dateOfTask, timeOfTask, dateOfReminder, timeOfReminder);
    timeOfReminder = reminderDateFormatter(dateOfTask, timeOfTask, dateOfReminder, timeOfReminder);

    if(willIcreateTask) {
        
        timeOfTask = getFormattedTime(timeOfTask);

        var dateArr = dateOfTask.split("-");
        var reversedDate = dateArr.reverse();
        reversedDate = dateArr.join("-");

        actuallyCreateTask(contentOfTask, timeOfTask, reversedDate);
    }

    if(willISetAReminder) {

        var ReminderDateArr = dateOfReminder.split("-");
        var reversedDateOfReminder = ReminderDateArr.reverse();
        reversedDateOfReminder = ReminderDateArr.join("-");

        const noteNum = notesArr.length;
        actuallySetAReminder(reversedDateOfReminder, timeOfReminder, noteNum ,contentOfTask);
    }
}

function actuallySetAReminder(reversedDateOfReminder, timeOfReminder, noteNum , contentOfTask){
    addNewReminderToDom(reversedDateOfReminder, timeOfReminder, noteNum ,contentOfTask);
    addRemindersToListAndLocalStorage(reversedDateOfReminder, timeOfReminder, noteNum , contentOfTask);
    addEventsToEachReminder();

}

function addNewReminderToDom(reversedDateOfReminder, timeOfReminder, noteNum ,contentOfTask) {
    var reminderLogList = document.getElementsByClassName("reminderLog").length
    document.getElementsByClassName("reminderLog")[reminderLogList-1].innerHTML =
            `<section class="reminderLog">
            <table>
                <tr>
                    <td rowspan="2">
                        <b>
                        &nbsp; ${noteNum} &nbsp; &nbsp; &nbsp;
                        </b>
                    </td>
                    <td>
                        <b>
                            <span style="background-color: rgba(255, 255, 255, 0.774);">
                                Task number ${noteNum} is: ${contentOfTask} 
                            </span>
                        </b>
                        </br>
                        <span>
                            A reminder is set to: ${reversedDateOfReminder}, at: ${timeOfReminder}
                        </span>
                    </td>
                </tr>
            </section>
            <div class="reminderLog"></div>`

}

function addRemindersToListAndLocalStorage(reversedDateOfReminder, timeOfReminder, noteNum , contentOfTask) {
    const saveReminderToJsonDB = {note: noteNum , content: contentOfTask, date: reversedDateOfReminder, time: timeOfReminder};

    reminderArr.push(saveReminderToJsonDB);

    const remindersToPush = JSON.stringify(reminderArr);
    localStorage.setItem("currReminders", remindersToPush);
}

function fillRemindersArr() {
    const localStorageReminders = localStorage.getItem("currReminders");
    if(localStorageReminders) {
        reminderArr = JSON.parse(localStorage.getItem("currReminders"));
    }
}

function addAllRemindersToDOM() {
    for (let i=0; i<reminderArr.length; i++){
        const reminderobjObj = reminderArr[i];

        addNewReminderToDOM(reminderobjObj.date, reminderobjObj.time, reminderobjObj.note, reminderobjObj.content); 
    }
}

function actuallyCreateTask(contentOfTask, timeOfTask, dateOfTask) {
    addNewNoteToDOM(contentOfTask, timeOfTask, dateOfTask);

    addEventsToEachNote();

    AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask);

    sendASideNote();
    clearForm();
    document.getElementById("contentsetheader").innerText = "Any other tasks, master?";
    document.getElementById("timesetheader").innerText = "Lets set up the time and date:";
}


//הפונקציה שאני עובד עליה

function saveCurrFormStateToLocalStorage() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    var timeOfReminder = document.getElementById("timeOfReminder").value;
    var dateOfReminder = document.getElementById("dateOfReminder").value;

    localStorage.setItem("contentOfTask", contentOfTask);
    localStorage.setItem("timeOfTask", timeOfTask);
    localStorage.setItem("dateOfTask", dateOfTask);

    localStorage.setItem("timeOfReminder", timeOfReminder);
    localStorage.setItem("dateOfReminder", dateOfReminder);
}

function AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask) {
    const saveNoteToJsonDB = { content: contentOfTask, time: timeOfTask, date: dateOfTask, reminderTime: timeOfReminder, reminderDate: dateOfReminder};

    notesArr.push(saveNoteToJsonDB);

    const notesToPush = JSON.stringify(notesArr);
    localStorage.setItem(LOCAL_STORAGE_NOTES, notesToPush);
}

function fillNotesFromLocalStorage(){
    fillFormFromLocalStorage();

    fillNotesArr();
    
    addAllNotesToDOM();

    addEventsToEachNote();

    fillRemindersArr();

    addAllRemindersToDOM();

    addEventsToEachReminder();
}

function fillFormFromLocalStorage() {
    const contentOfTask = localStorage.getItem("contentOfTask");
    const timeOfTask = localStorage.getItem("timeOfTask");
    const dateOfTask = localStorage.getItem("dateOfTask");
    const dateOfReminder = localStorage.getItem("dateOfReminder");
    const timeOfReminder = localStorage.getItem("timeOfReminder");

    document.getElementById("contentOfTask").value = contentOfTask;
    document.getElementById("timeOfTask").value = timeOfTask;
    document.getElementById("dateOfTask").value = dateOfTask;
    document.getElementById("timeOfReminder").value = timeOfReminder;
    document.getElementById("dateOfReminder").value = dateOfReminder;
}

function fillNotesArr() {
    const localStorageNotes = localStorage.getItem(LOCAL_STORAGE_NOTES);
    if(localStorageNotes) {
        notesArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTES));
    }
}

function addAllNotesToDOM() {
    for (let i=0; i<notesArr.length; i++){
        const noteObj = notesArr[i];

        addNewNoteToDOM(noteObj.content, noteObj.time, noteObj.date); 
    }
}

function addNewNoteToDOM (contentOfTask, timeOfTask, reversedDate) {
    var divTag = document.createElement("div");
    document.getElementById("frameDiv1").appendChild(divTag); 
    divTag.setAttribute("class", "aba col-lg-2 col-sm-6 col-1");
    divTag.innerHTML =
        `<div class="wrapper">   
            <div class="pinStyle" style="background-image:url('pininwithshadow.png')";>
            </div>
            <div class="myDivStyle fade-in">
                <div class="centerText"></div>
                <div class="containerDiv">
                    <span name="spanForCancel" class="iAmClassless"></span>
                    </br>
                    <fieldset style='width:85%; height:140px; border: 1px solid black; margin-left:6px; margin-top:2px;'>
                        <legend>
                            To Do:
                        </legend>
                        <div style="width:99%;height:88px;padding:5px;border: 1px solid red ;overflow-y:scroll;" class='pContentOfTask'>
                            `+contentOfTask+`
                        </div>
                    </fieldset>
                    <fieldset style='width:85%;height:50px;border: 1px'>
                        <div style='float:left;'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                Be ready at:
                            </span>
                        </div>
                        <div width:50%; length:50%; style='float:right;margin-right:10%;' class='pTimeOfTask'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                `+timeOfTask+`
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
                                `+reversedDate+`
                            </span>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>`;
}

//validations
//בדיקה אם התאריך והזמן לא מהעבר
function taskDateValidation(inputDate, inputHour){
    const currDate = new Date();

    let dateToCheck = new Date(inputDate);
    if(inputHour) {
        dateToCheck = new Date(inputDate + " " + inputHour);
    }

    if (inputHour==""                                        &&
    dateToCheck.getDate() == currDate.getDate()              && 
    dateToCheck.getMonth() == currDate.getMonth()            && 
    dateToCheck.getYear() == currDate.getYear()              )
    {
        return true;
    } else if ((dateToCheck.getDate() == currDate.getDate()  && 
    dateToCheck.getMonth() == currDate.getMonth()            && 
    dateToCheck.getYear() == currDate.getYear()              && 
    dateToCheck.getHours() < currDate.getHours()             &&
    dateToCheck.getMinutes() < currDate.getMinutes())        ||
    dateToCheck.getTime() < currDate.getTime()               )
    {
        changeDateFormHeaderAccordingToValidation();
        return false;
    } 
    return true;
}

//NEWVALIDATION
function reminderDateValidation(inputDate, inputHour, inputReminderDate, inputReminderHour){
    const currDate = new Date();

    let taskDateToCheck = new Date(inputDate);
    if(inputHour) {
        taskDateToCheck = new Date(inputDate + " " + inputHour);
    }
    
    let reminderToCheck = new Date(inputReminderDate);
    if(inputReminderHour) {
        reminderToCheck = new Date(inputReminderDate + " " + inputReminderHour);
    }

    let DateInput = new Date(reminderToCheck.getFullYear(), reminderToCheck.getMonth(), reminderToCheck.getDate());

    let TaskDate = new Date(taskDateToCheck.getFullYear(), taskDateToCheck.getMonth(), taskDateToCheck.getDate());

    let DateOfNow = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    let TimeInput = reminderToCheck.toLocaleTimeString();
    let TaskTime = taskDateToCheck.toLocaleTimeString();
    let TimeOfNow = currDate.toLocaleTimeString();


    if (DateOfNow<DateInput<=TaskDate    ||
        DateOfNow<DateInput<=TaskDate    &&
        TimeOfNow < TimeInput < TaskTime &&
        DateInput == TaskDate            ||
        DateOfNow<DateInput<=TaskDate    &&
        TimeInput < TaskTime             &&
        DateInput > DateOfNow)
        {
        return true;
    } 
    return false;
}

//NEWVALIDATION
function reminderDateFormatter(inputDate, inputHour, inputReminderDate, inputReminderHour){
    const currDate = new Date();

    let taskDateToCheck = new Date(inputDate);
    if(inputHour) {
        taskDateToCheck = new Date(inputDate + " " + inputHour);
    }
    
    let reminderToCheck = new Date(inputReminderDate);
    if(inputReminderHour) {
        reminderToCheck = new Date(inputReminderDate + " " + inputReminderHour);
    }

    let DateInput = new Date(reminderToCheck.getFullYear(), reminderToCheck.getMonth(), reminderToCheck.getDate());

    let TaskDate = new Date(taskDateToCheck.getFullYear(), taskDateToCheck.getMonth(), taskDateToCheck.getDate());

    let DateOfNow = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    let TimeInput = reminderToCheck.toLocaleTimeString();
    let TaskTime = taskDateToCheck.toLocaleTimeString();
    let TimeOfNow = currDate.toLocaleTimeString();


    if (DateOfNow<DateInput<=TaskDate){
            if (TimeOfNow < TimeInput < TaskTime &&
                DateInput == TaskDate            ||
                TimeInput < TaskTime             &&
                DateInput > DateOfNow)
                {
                    return TimeInput;
            }
        TimeInput = changeTimeOfReminderToZero(TimeInput);
        return TimeInput;
    } 
    return TimeInput;
}

function changeTimeOfReminderToZero(TimeInput) {
    
    var compareZeroDate1 = new Date(0,0,0,2,0,0,0);
    var compareZeroDate2 = new Date(0,0,0,3,0,0,0);

    compareZeroDate1 = compareZeroDate1.toLocaleTimeString();
    compareZeroDate2 = compareZeroDate2.toLocaleTimeString();
    if ((TimeInput==compareZeroDate1)  ||
        (TimeInput==compareZeroDate2)  )
        {
        TimeInput = "00:00";
        return TimeInput;
    }
        return TimeInput;
}


//NEWVALIDATION

function changeDateFormHeaderAccordingToValidation() {
    document.getElementById("timesetheader").innerText = "Plans are usually for the future.";
    setTimeout(function(){ document.getElementById("timesetheader").innerText = "Lets set up the time and date:"; }, 3000);
}

function changeContentFormBorderBack() {
    document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid white;border-radius: 6px;");
}


//בדיקה שכל תאי החובה הוזנו
function contentValidation(input1BeingChecked, input2BeingChecked){
    if (input1BeingChecked==""){
        document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid red;border-radius: 6px;");
        return false;
    }
    if (input2BeingChecked==""){
        document.getElementById("dateOfTask").setAttribute("style", "border: 1px solid red;border-radius: 6px;");
        return false;
    }
    return true;
}

//פונקציה שמגדירה שאם אין זמן מוגדר (לא חובה) אז נכתוב שהמשימה היא כל היום
function getFormattedTime(inputTime){
    if (inputTime==""){
        var timeText = "Whole Day";
    } else {
        timeText = inputTime;
    }
    return timeText;
}
//סוף לולידציות

//פונקציה שמנקה את הפורם לאחר לחיצה ליצירת הפתק
function clearForm(){
    document.getElementById("contentOfTask").value = "";
    document.getElementById("timeOfTask").value = "";
    document.getElementById("dateOfTask").value = "";
    document.getElementById("timeOfReminder").value = "";
    document.getElementById("dateOfReminder").value = "";
    document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid white;border-radius: 6px;");
    document.getElementById("dateOfTask").setAttribute("style", "border-radius: 6px;");
    saveCurrFormStateToLocalStorage();
}


// פונקציות שהן פקודות ליצירה או מחיקה של משימות

//פונקציה שמוסיפה לפתקים איוונטים בעת מעבר העכבר בעל הפתק
function addEventsToEachNote(){
    var contDivArr = document.getElementsByClassName("containerDiv").length;
    for (var g=0;g<contDivArr;g++){
        const currObject = document.getElementsByClassName("containerDiv")[g];
        currObject.setAttribute("onmouseover", `removeNote(${g})`);
        currObject.setAttribute("onmouseleave", "backToNormal(" + g + ")");
    }
}

//פונקציה שמגדירה את האיוונט בו העכבר על פתק מסוים ונפתחת הגישה לסגירת הפתק ובנוסף עושה אנימציה
function removeNote(iC){
    document.getElementsByName("spanForCancel")[iC].setAttribute("class", "glyphicon glyphicon-remove");
    document.getElementsByName("spanForCancel")[iC].setAttribute("onclick", `finalRemoval(${iC});addEventsToEachNote();`);
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pinoutwithshadow.png');");
}

function addEventsToEachReminder(){
    var contReminderDivArr = document.getElementsByClassName("reminderLog").length;
    for (var g=0;g<contReminderDivArr;g++){
        const currObject = document.getElementsByClassName("reminderLog")[g];
        currObject.setAttribute("onmouseover", `removeReminder(${g})`);
        currObject.setAttribute("onmouseleave", "reminderBackToNormal(" + g + ")");
    }
}

//פונקציה שמורידה את האיקס בעת ירידת העכבר מהפתק ובנוסף עושה אנימציה לסיכה
function backToNormal(iC){
    document.getElementsByName("spanForCancel")[iC].setAttribute("class", "iAmClassless");
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pininwithshadow.png');");

}

function reminderBackToNormal(iC){
    document.getElementsByName("reminderLog")[iC].setAttribute("class", "iHaveNoClass");
}

function removeReminder(iC){
    document.getElementsByName("reminderLog")[iC].setAttribute("class", "glyphicon glyphicon-remove");
    document.getElementsByName("reminderLog")[iC].setAttribute("onclick", `ReminderfinalRemoval(${iC});addEventsToEachReminder();`);
}

//פונקציה שסוגרת את הפתק בעת לחיצה על האיקס
function ReminderfinalRemoval(indexToDelete){
    var remindersList = document.getElementsByClassName("reminderLog");
    remindersList[indexToDelete].remove();

    reminderArr.splice(indexToDelete, 1);
    var currReminderArrayToSave = JSON.stringify(reminderArr);
    localStorage.setItem("currReminders", currReminderArrayToSave);
}


//easterEggs

function sendASideNote(){

var dateCheckForSpecialFeatures = new Date();
//deathnote feature for Friday the 13th
if (notesArr.length==2){
    document.getElementById("sidenotes").innerHTML =
    `<section class="disappearingnote fade-in">
        </br>
            <b>
                You go, busy ${personDescription}!
                </br>
                <img src="smiley.png" style="width:30px;height:30px;">
            </b>
        </br>
        </br>
    </section>`;
}

    if (dateCheckForSpecialFeatures.getDay()==5   &&
        dateCheckForSpecialFeatures.getDate()==13 &&
        notesArr.length==4){
        document.getElementById("pageheadline").setAttribute("style","font-family:death_note;color:white;");
        document.getElementById("pageheadline").innerHTML = "DEATH NOTE";
        document.body.setAttribute("background","tile6.jpg");
        document.getElementById("formContainer").setAttribute("style","background-image: url('formbgfin5.png'); background-size: cover;")
        document.getElementById("contentsetheader").innerText = "Put in a name and the way of death:";
        document.getElementById("timesetheader").innerText = "When will the person die?";

        document.getElementById("sidenotes").innerHTML =
        `<section class="disappearingnote fade-in">
            </br>
                <b>
                    You are the master of death!
                    </br>
                    <img src="deathnote.png" style="width:90px;height:30px;">
                </b>
            </br>
            </br>
        </section>`;
    }

    if (notesArr.length==5){
        document.getElementById("sidenotes").innerHTML =
        `<section class="disappearingnote fade-in">
            </br>
                <b>
                    You are a busy one!
                    </br>
                    <img src="smiley.png" style="width:30px;height:30px;">
                </b>
            </br>
            </br>
        </section>`;
    }

    if (notesArr.length==8){
        document.getElementById("sidenotes").innerHTML =
        `<section class="disappearingnote fade-in">
            </br>
                <b>
                    Don't strain yourself!
                    </br>
                    <img src="smart.png" style="width:30px;height:30px;">
                </b>
            </br>
            </br>
        </section>`;
    }


    if (notesArr.length==10){
        document.getElementById("sidenotes").innerHTML =
        `<section class="disappearingnote fade-in">
            </br>
                <b>
                    You are the master of this notice board!
                    </br>
                    <img src="strong.png" style="width:30px;height:30px;">
                </b>
            </br>
            </br>
        </section>`;
    }

}

function fadeSideNoteOut(){
    document.getElementById("sidenotes").innerHTML = "";
}

//deathnotefeature