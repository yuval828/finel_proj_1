var date, time, userEndTime, userEndTimeToLocal, noteText, earlyDateChk, newNote,
    IndexFromStorage, textnode, noteObj, noteList, deleteIndex = 0;

function validateDateAndTime() {
    getDataFromInputs();
    //get today's date in string
    var todayDate = new Date();

    //Convert both input to date type
    var inputToDate = Date.parse(userEndTime);
    var todayToDate = Date.parse(todayDate);

    //compare dates
    if (date == "" || noteText == "") {
        alert("please enter all the data to create a note");
    } else if (inputToDate < todayToDate) {
        alert("the input is earlier than today, enter the data again");
        // earlyDateChk = 9;
        saveFormDataToLocalS();
    } else {
        // earlyDateChk = 0;
        localStorage.setItem("earlyDateChk", earlyDateChk = 0);
        saveNoteDataToLocalStorage();
        createNote(noteObj);
    }
}


function getDataFromInputs() {
    time = document.getElementById("timeEndOfTask").value;
    if (time == "") {
        time = "20:00";
    }
    date = document.getElementById("dateEndOfTask").value;
    userEndTime = date + " " + time;
    noteText = document.getElementById("enterNoteText").value;
    clearForm();
    return time, date, userEndTime, noteText;
}

function saveFormDataToLocalS() {
    localStorage.setItem("time", time);
    localStorage.setItem("date", date);
    localStorage.setItem("noteText", noteText);
    localStorage.setItem("earlyDateChk", earlyDateChk = 9);
}


function getDataFromLocalS() {
    if (localStorage.earlyDateChk == 9) {
        document.getElementById("enterNoteText").value = localStorage.noteText;
        document.getElementById("timeEndOfTask").value = localStorage.time;
        document.getElementById("dateEndOfTask").value = localStorage.date;
    }
    restoreNotes();
}


function createNote(noteObj, deleteIndex) {

    //יוצר דיב עם כל נתוני הנוט
    newNote = document.createElement("div");
    newNote.setAttribute("id", "Notes");
    document.getElementById("footer").appendChild(newNote);

    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteText" + deleteIndex);
    textnode.setAttribute("style", "width: 86%; height: 166px; margin-top: 15% !important; font-weight: 100; margin-left: 2%; overflow-y: auto;");
    newNote.appendChild(textnode);
    document.getElementById("noteText" + deleteIndex).innerHTML = noteObj.noteText;

    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteDateEndOfTask" + deleteIndex);
    textnode.setAttribute("style", "width: 56%; font-size: small; margin-left: 7%; text-align: left;");
    newNote.appendChild(textnode);
    document.getElementById("noteDateEndOfTask" + deleteIndex).innerHTML = noteObj.userEndTime;

}


function saveNoteDataToLocalStorage() {
    //מכניס את כל מידע הנוט לאובייקט שאותו טוען לליסט
    noteObj = {
        userEndTime: userEndTime,
        noteText: noteText,
        deleteIndex: deleteIndex + noteList.length
    }
    noteList.push(noteObj);
    localStorage.setItem("noteList", JSON.stringify(noteList));
}


function restoreNotes() {
    // check if key exists
    var checkNoteList = localStorage.getItem("noteList");
    if (checkNoteList == null) {
        localStorage.setItem("noteList", JSON.stringify([]));
    }
    // load existing tasks from local storage to array
    noteList = JSON.parse(localStorage.getItem("noteList"));

    for (let Index = 0; Index < noteList.length; Index++) {
        createNote(noteList[Index], Index)
    }
}


function deleteNote() {
    //צריך לקבל את נתוני הנוט שנסגר כולל האינדקס שלו ולשלוף אותו מהזכרון
    // איך משנים לכל השאר את המספור?
    // localStorage.removeItem('myCat');
}


function clearForm() {
    if (earlyDateChk == 0) {
        document.getElementById("timeEndOfTask").value = "";
        document.getElementById("dateEndOfTask").value = "";
        document.getElementById("enterNoteText").value = "";
    }
}