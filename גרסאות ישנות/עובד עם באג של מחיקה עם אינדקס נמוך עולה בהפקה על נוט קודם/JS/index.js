/* date - input date, time - input time, userEndTime - input date + time, 
 noteText - input of note text, noteObj - enter all note data to obj, 
 noteList - enter all obj to array */
var date, time, userEndTime, newNote, textnode, noteObj, noteList;

function validateDateAndTime() {
    getDataFromInputs();
    //get today's date in string
    let todayDate = new Date();

    //Convert both input to date type
    let inputToDate = Date.parse(userEndTime);
    todayToDate = Date.parse(todayDate);


    //validat input from user not empty 
    if (date == "" || noteText == "") {
        alert("please enter all the data to create a note");
    } else if (inputToDate < todayToDate) { //compare dates if input date is earlier will alert
        alert("the input is earlier than now, correct the data or time ");
    } else {
        saveNoteDataToLocalStorage();
        createNote(noteObj, noteObj.Index);
    }
}

//get all the input from user
function getDataFromInputs() {
    time = document.getElementById("timeEndOfTask").value;
    if (time == "") { //if time is empty put this default
        time = "20:00";
    }
    date = document.getElementById("dateEndOfTask").value;
    userEndTime = date + " " + time;
    noteText = document.getElementById("enterNoteText").value;
    return date, userEndTime, noteText;
}


function createNote(noteObj, Index) {
    //create the note div
    let newNote = document.createElement("div");
    newNote.setAttribute("class", "Note");
    newNote.setAttribute("id", Index);
    document.getElementById("footer").appendChild(newNote);

    //create the font awosom btn
    fontAwsIcon = document.createElement("i");
    fontAwsIcon.setAttribute("class", "fas fa-times delBtn");
    fontAwsIcon.addEventListener("click", function(e) {

        let noteEl = e.target.closest(".Note");
        deleteNote(noteEl.id);
        noteEl.remove();
    });

    newNote.appendChild(fontAwsIcon);

    //create the text note div
    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteText" + Index);
    textnode.setAttribute("class", "noteText");
    newNote.appendChild(textnode);
    document.getElementById("noteText" + Index).innerHTML = noteObj.noteText;


    //create the end time note div
    textnode = document.createElement("div");
    textnode.setAttribute("id", "noteDateEndOfTask" + Index);
    textnode.setAttribute("class", "noteDateEndOfTask");
    newNote.appendChild(textnode);
    document.getElementById("noteDateEndOfTask" + Index).innerHTML = noteObj.userEndTime;
    clearForm();
}

//save note data to obj and then put in array and store to local storage
function saveNoteDataToLocalStorage() {

    noteObj = {
        userEndTime: userEndTime,
        noteText: noteText,
        Index: noteList.length
    }
    noteList.push(noteObj);
    localStorage.setItem("noteList", JSON.stringify(noteList));
}


//on load of body will restore form data(if input date was earlier then now ) and restore notes
function restoreNotes() {
    //check if noteList array is empty 
    let checkNoteList = localStorage.getItem("noteList");
    if (checkNoteList == null) {
        localStorage.setItem("noteList", JSON.stringify([]));
    }
    // load existing notes from local storage to array
    noteList = JSON.parse(localStorage.getItem("noteList"));

    for (let i = 0; i < noteList.length; i++) {
        createNote(noteList[i], i)
    }
}

//delete note
function deleteNote(Index) {
    // localStorage.setItem("Index",noteList.length);
    noteList.splice(Index, 1); //del obj from array
    localStorage.removeItem("noteList"); //clear local storage
    localStorage.setItem("noteList", JSON.stringify(noteList)); //save to local storage the new array
    // location.reload(); //refrash page
}

//will clear the form
function clearForm() {
    document.getElementById("timeEndOfTask").value = "";
    document.getElementById("dateEndOfTask").value = "";
    document.getElementById("enterNoteText").value = "";
}