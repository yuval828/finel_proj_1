function prepareToCreateTask() {
    var contentOfTask = document.getElementById("contentOfTask").value;
    var timeOfTask = document.getElementById("timeOfTask").value;
    var dateOfTask = document.getElementById("dateOfTask").value;

    let willIcreateTask = true;
    willIcreateTask = willIcreateTask && contentValidation(contentOfTask, dateOfTask);

    const currDate = new Date();

    willIcreateTask = willIcreateTask && taskDateValidation(currDate, dateOfTask, timeOfTask);

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
    checkPastTasks();
    addEventsToEachNote();
    AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask);
    
    sendASideNote();
    prepareToSetAReminder(contentOfTask, timeOfTask, dateOfTask);
    
    clearForm();
    document.getElementById("contentsetheader").innerText = "Any other tasks, master?";
    document.getElementById("timesetheader").innerText = "Lets set up the time and date:";
}

function AddNoteToListAndLocalStorage(contentOfTask, timeOfTask, dateOfTask) {
    const saveToJsonDB = { content: contentOfTask,
                           time: timeOfTask,
                           date: dateOfTask,
                           notesIndex: notesArr.length+1};

    notesArr.push(saveToJsonDB);

    const notesToPush = JSON.stringify(notesArr);
    localStorage.setItem(LOCAL_STORAGE_NOTES, notesToPush);
}


function clearForm(){
    document.getElementById("contentOfTask").value = "";
    document.getElementById("timeOfTask").value = "";
    document.getElementById("dateOfTask").value = "";

    document.getElementById("dateOfReminder").value = "";
    document.getElementById("timeOfReminder").value = "";

    document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid white;border-radius: 6px;");
    document.getElementById("dateOfTask").setAttribute("style", "border-radius: 6px;");
    saveCurrFormStateToLocalStorage();
}