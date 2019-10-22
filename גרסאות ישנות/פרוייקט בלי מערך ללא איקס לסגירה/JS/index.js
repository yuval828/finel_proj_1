var date, time, userEndTime, userEndTimeToLocal, noteText, earlyDateChk, newNote, Index = 0,
    IndexFromStorage, textnode;

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
        createNote();
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


function getDataFromLocalS() {
    if (localStorage.earlyDateChk == 9) {
        document.getElementById("enterNoteText").value = localStorage.noteText;
        document.getElementById("timeEndOfTask").value = localStorage.time;
        document.getElementById("dateEndOfTask").value = localStorage.date;
    }
    restoreNotes();
}


function saveFormDataToLocalS() {
    // for (i = 0; i < coffee.length; i++) {
    //     // coffee[i] = Number(coffee[i]);
    //     // myJSON[i] = JSON.stringify(coffee[i].value);
    //     localStorage.setItem("cofJSON" + i, coffee[i].value);
    localStorage.setItem("time", time);
    localStorage.setItem("date", date);
    localStorage.setItem("noteText", noteText);
    localStorage.setItem("earlyDateChk", earlyDateChk = 9);
}


function createNote() {
    //יוצר דיב עם כל נתוני הנוט
    newNote = document.createElement("div");
    newNote.setAttribute("id", "Notes");
    document.getElementById("footer").appendChild(newNote);

    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteText" + Index);
    textnode.setAttribute("style", "width: 86%; height: 166px; margin-top: 15% !important; font-weight: 100; margin-left: 2%; overflow-y: auto;");
    newNote.appendChild(textnode);
    document.getElementById("noteText" + Index).innerHTML = noteText;

    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteDateEndOfTask" + Index);
    textnode.setAttribute("style", "width: 56%; font-size: small; margin-left: 7%; text-align: left;");
    newNote.appendChild(textnode);
    document.getElementById("noteDateEndOfTask" + Index).innerHTML = userEndTime;

    saveNoteDataToLocalStorage();
}


function saveNoteDataToLocalStorage() {
    localStorage.setItem("userEndTime" + Index, userEndTime);
    localStorage.setItem("noteText" + Index, noteText);
    localStorage.setItem("Index", Index);

    Index++

    //שמירה כאובייקט לא מצליח לשחזר
    // if (noteLocalStorage[noteIndex] == undefined) {
    //     noteLocalStorage[noteIndex] = { noteText, date, time };
    //     localStorage.setItem("noteLocalStorage" + noteIndex, noteLocalStorage[noteIndex]);
    //     noteIndex++
    // }

    // for (noteIndex = 0; noteLocalStorage[noteIndex] != "undefined"; noteIndex++) {
    //     noteLocalStorage[noteIndex] = { noteText, date, time };
    //     localStorage.setItem("noteLocalStorage" + noteIndex, noteLocalStorage[noteIndex].value);
    // }

}


function restoreNotes() {
    noteIndexFromStorage = localStorage.getItem("Index");
    for (noteIndexFromStorage; noteIndexFromStorage != null && noteIndexFromStorage + 1 > 0; noteIndexFromStorage--) {
        userEndTime = localStorage.getItem("userEndTime" + Index);
        noteText = localStorage.getItem("noteText" + Index);
        createNote()
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