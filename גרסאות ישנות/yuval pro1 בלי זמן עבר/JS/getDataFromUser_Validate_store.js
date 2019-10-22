/* userEndTime - input date + time, 
 noteObj - enter all note data to obj, 
 noteList - enter all obj to array */
var date, noteText, userEndTime, noteObj, noteList, counter;

function createNoteFromUserInput() {
    getDataFromInputs();
    let isvalid = validateInput(userEndTime);
    if (isvalid) {
        saveNoteDataToLocalStorage(userEndTime, noteText);
        clearForm();
        createNote(noteObj, noteList.length);
    }
}

//get all the input from user
function getDataFromInputs() {
    let time = document.getElementById("timeEndOfTask").value;
    if (time == "") { //if time is empty put this default
        time = "20:00";
    }
    date = document.getElementById("dateEndOfTask").value;
    userEndTime = date + " " + time;
    noteText = document.getElementById("enterNoteText").value;
    return date, userEndTime, noteText;
}

function validateInput(userEndTime) {
    //get today's date in string
    let todayDate = new Date();

    //Convert both input to date type
    let inputToDate = Date.parse(userEndTime);
    let todayToDate = Date.parse(todayDate);
    if (date == "" || noteText == "") { //validat input from user not empty 
        alert("please enter all the data to create a note");
        return false;
    } else if (inputToDate < todayToDate) { //compare dates if input date is earlier will alert
        alert("the input is earlier than now, correct the data or time ");
        return false;
    }
    return true;
}

//save note data to obj and then put in array and store to local storage
function saveNoteDataToLocalStorage(userEndTime, noteText) {
    localStorage.setItem("counter", ++counter);
    noteObj = {
        userEndTime: userEndTime,
        noteText: noteText,
        counter: counter
    }
    noteList.push(noteObj);
    localStorage.setItem("noteList", JSON.stringify(noteList));
}

//will clear the form
function clearForm() {
    document.getElementById("timeEndOfTask").value = "";
    document.getElementById("dateEndOfTask").value = "";
    document.getElementById("enterNoteText").value = "";
}