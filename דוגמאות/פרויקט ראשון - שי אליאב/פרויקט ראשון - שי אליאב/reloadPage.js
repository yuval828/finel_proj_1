function saveCurrFormStateToLocalStorage() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    localStorage.setItem("contentOfTask", contentOfTask);
    localStorage.setItem("timeOfTask", timeOfTask);
    localStorage.setItem("dateOfTask", dateOfTask);
}

function fillNotesFromLocalStorage(){
    fillFormFromLocalStorage();

    fillNotesArr();    
    addAllNotesToDOM();
    checkPastTasks();
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

function fillRemindersArr(){
    const localStorageReminders = localStorage.getItem(LOCAL_STORAGE_REMINDERS);
    if(localStorageReminders) {
        reminderArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REMINDERS));
    }
}

function addAllRemindersToDOM(){
    for (let i=0; i<reminderArr.length; i++){
        const reminderObj = reminderArr[i];

        addNewReminderToDOM(reminderObj.reminderDate, reminderObj.reminderTime, reminderObj.noteNum, reminderObj.content); 
    }
}