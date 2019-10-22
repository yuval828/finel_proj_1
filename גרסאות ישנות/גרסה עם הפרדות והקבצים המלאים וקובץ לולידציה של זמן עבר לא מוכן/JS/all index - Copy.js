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



function createNote(noteObj) {

    //create the note div
    let newNote = document.createElement("div");
    newNote.className = "Note";
    newNote.setAttribute("id", noteObj.counter);
    document.getElementById("footer").appendChild(newNote);

    //create the font awosom btn
    let textnode = document.createElement("i");
    textnode.className = "fas fa-times delBtn";
    textnode.addEventListener("click", function(e) {
        let noteEl = e.target.closest(".Note");
        deleteNote(noteEl.id);
        noteEl.remove();
    });
    newNote.appendChild(textnode);

    //create the text note div
    textnode = document.createElement("div");
    textnode.className = "noteText";
    newNote.appendChild(textnode);
    textnode.innerHTML = noteObj.noteText;

    //create the end time note div
    textnode = document.createElement("div");
    textnode.className = "noteDateEndOfTask";
    newNote.appendChild(textnode);
    textnode.innerHTML = noteObj.userEndTime;
}


//on load of body will restore form data(if input date was earlier then now ) and restore notes
function restoreNotes() {
    //check if noteList array is empty 
    noteList = localStorage.getItem("noteList");
    if (noteList == null) {
        localStorage.setItem("noteList", JSON.stringify([]))
    }
    // load existing notes from local storage to array
    noteList = JSON.parse(localStorage.getItem("noteList"));
    counter = localStorage.getItem("counter", counter)
    if (counter == null) {
        counter = -1;
    } else {
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i] != null) {
                createNote(noteList[i], i)
            } else(noteList.splice(i--, 1))
        }
    }
}


//delete note
function deleteNote(counter) {
    for (var i = 0; i < noteList.length; i++) { //search the index of the right counter
        if (noteList[i].counter === Number(counter)) {
            noteList.splice(i, 1); //del obj from array
            localStorage.removeItem("noteList"); //clear local storage
            localStorage.setItem("noteList", JSON.stringify(noteList)); //save to local storage the new array
        }
    }
}