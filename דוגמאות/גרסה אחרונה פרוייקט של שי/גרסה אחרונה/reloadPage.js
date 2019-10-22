function saveCurrFormStateToLocalStorage() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    if ((document.getElementById("timeOfReminder")) && (document.getElementById("dateOfReminder"))){
        var dateOfReminder = document.getElementById("dateOfReminder").value;
        var timeOfReminder = document.getElementById("timeOfReminder").value;
    } else if (document.getElementById("dateOfReminder")){
        var dateOfReminder = document.getElementById("dateOfReminder").value;
    } else if (document.getElementById("timeOfReminder")){
        var timeOfReminder = document.getElementById("timeOfReminder").value;
    }

    localStorage.setItem("contentOfTask", contentOfTask);
    localStorage.setItem("timeOfTask", timeOfTask);
    localStorage.setItem("dateOfTask", dateOfTask);

    localStorage.setItem("dateOfReminder", dateOfReminder);
    localStorage.setItem("timeOfReminder", timeOfReminder);
}

function fillNotesFromLocalStorage(){
    fillFormFromLocalStorage();
    fillReminderInfoInForm();

    fillNotesArr();    
    addAllNotesToDOM();
    checkPastTasks();
    addEventsToEachNote();

    fillRemindersArr();    
    addAllRemindersToDOM();
    addEventsToEachReminder();
}

function fillFormFromLocalStorage() {
    const contentOfTask = localStorage.getItem("contentOfTask");
    const timeOfTask = localStorage.getItem("timeOfTask");
    const dateOfTask = localStorage.getItem("dateOfTask");

    
    document.getElementById("contentOfTask").value = contentOfTask;
    document.getElementById("timeOfTask").value = timeOfTask;
    document.getElementById("dateOfTask").value = dateOfTask;

    
    
}

function fillReminderInfoInForm(){
    const dateOfReminder = localStorage.getItem("dateOfReminder");
    const timeOfReminder = localStorage.getItem("timeOfReminder");
    document.getElementById("dateOfReminder").value = dateOfReminder;
    document.getElementById("timeOfReminder").value = timeOfReminder;
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
        remindersArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REMINDERS));
    }
}

function addAllRemindersToDOM(){
    for (let i=0; i<remindersArr.length; i++){
        const reminderObj = remindersArr[i];

        addNewReminderToDOM(reminderObj.reminderDate,
                            reminderObj.reminderTime,
                            reminderObj.noteNumber,
                            reminderObj.contentOfTask,
                            reminderObj.dateOfTask,
                            reminderObj.timeOfTask,
                            reminderObj.reminderIndex); 
    }
}
