//חסר: בוטסטרפ לגדלי מסך שונים
var notesArr = new Array();
const LOCAL_STORAGE_NOTES = "currNotes";

function createTask() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    //יישום הולידציה לצורך יצירת הפונקציה
    let willIcreateTask = true;
    willIcreateTask = willIcreateTask && contentValidation(contentOfTask);
    willIcreateTask = willIcreateTask && contentValidation(dateOfTask);
    willIcreateTask = willIcreateTask && taskDateValidation(dateOfTask, timeOfTask);
    
    if(willIcreateTask) {
        
        timeOfTask = getFormattedTime(timeOfTask);

        var dateArr = dateOfTask.split("-");
        var reversedDate = dateArr.reverse();
        reversedDate = dateArr.join("-");

        actuallyCreateTask(contentOfTask, timeOfTask, reversedDate);
    } 
}

function actuallyCreateTask(contentOfTask, timeOfTask, dateOfTask) {
    addNewNoteToDOM(contentOfTask, timeOfTask, dateOfTask);

    addEventsToEachNote();

    AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask);

    clearForm();
    document.getElementById("contentsetheader").innerText = "Any other tasks, master?";
    document.getElementById("timesetheader").innerText = "Lets set up the time and date:";
}

function saveCurrFormStateToLocalStorage() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    localStorage.setItem("contentOfTask", contentOfTask);
    localStorage.setItem("timeOfTask", timeOfTask);
    localStorage.setItem("dateOfTask", dateOfTask);
}

function AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask) {
    const saveToJsonDB = { content: contentOfTask, time: timeOfTask, date: dateOfTask};

    notesArr.push(saveToJsonDB);

    const notesToPush = JSON.stringify(notesArr);
    localStorage.setItem(LOCAL_STORAGE_NOTES, notesToPush);
}

function fillNotesFromLocalStorage(){
    fillFormFromLocalStorage();

    fillNotesArr();
    
    addAllNotesToDOM();

    addEventsToEachNote();
}

function fillFormFromLocalStorage() {
    const contentOfTask = localStorage.getItem("contentOfTask");
    const timeOfTask = localStorage.getItem("timeOfTask");
    const dateOfTask = localStorage.getItem("dateOfTask");

    document.getElementById("contentOfTask").value = contentOfTask;
    document.getElementById("timeOfTask").value = timeOfTask;
    document.getElementById("dateOfTask").value = dateOfTask;
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
    divTag.setAttribute("class", "aba");
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

    //גבולות ניסיון
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
        changeFormAppearanceAccordingToValidation();
        return false;
    } 
    return true;
}

function changeFormAppearanceAccordingToValidation() {
    document.getElementById("timesetheader").innerText = "Plans are usually for the future.";
}


//בדיקה שכל תאי החובה הוזנו
function contentValidation(inputBeingChecked){
    if (inputBeingChecked==""){
        document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid red");
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
    document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: none;");
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
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "glyphicon glyphicon-remove");
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("onclick", `finalRemoval(${iC});addEventsToEachNote();`);
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pinoutwithshadow.png');");
}

//פונקציה שמורידה את האיקס בעת ירידת העכבר מהפתק ובנוסף עושה אנימציה לסיכה
function backToNormal(iC){
    var cancelNote = document.getElementsByName("spanForCancel")[iC].setAttribute("class", "iAmClassless");
    document.getElementsByClassName("pinStyle")[iC].setAttribute("style", "background-image:url('pininwithshadow.png');");

}

//פונקציה שסוגרת את הפתק בעת לחיצה על האיקס
function finalRemoval(indexToDelete){
    var notesList = document.getElementsByClassName("aba");
    notesList[indexToDelete].remove();

    notesArr.splice(indexToDelete, 1);
    var currArrayToSave = JSON.stringify(notesArr);
    localStorage.setItem(LOCAL_STORAGE_NOTES, currArrayToSave);
}