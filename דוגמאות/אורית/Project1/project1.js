var taskList;

function startApp() {
    loadDB()
    loadAllTasks()
}

function loadDB() {
    // check if key exists
    var checkTaskList = localStorage.getItem("taskList");
    if (checkTaskList == null) {
        localStorage.setItem("taskList", JSON.stringify([]));
        console.log("creating new db");
    }
    // load existing tasks from local storage to array
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

// load all tasks from the updated array
function loadAllTasks() {
    // clear all tasks before reloading them
    clearAllTasks()
    for (var i = 0; i < taskList.length; i++) {
        createTaskDiv(taskList[i], i)
    }
}

// add task to task list, and update DB
function addTask() {
    var taskNameValue = document.getElementById("taskName").value;
    var taskDescValue = document.getElementById("taskDesc").value;
    var taskDateValue = Date.parse(document.getElementById("taskDate").value);
  
    // validate that the fields are not empty
    if (taskNameValue == "" || taskDescValue == "" || isNaN(taskDateValue)) {
        alert("Please fill all fields")
    } else {
        var taskObj = {
            taskName: taskNameValue,
            taskDesc: taskDescValue,
            taskDate: taskDateValue
        }
        taskList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        clearFields();
        // load all tasks from Local Stroage
        loadAllTasks()
    }
}

function createTaskDiv(taskObj, i) {
    var node = document.createElement("div");
    var dateObj = moment(taskObj.taskDate)
    var dateStr = dateObj.format('DD/MM/YY HH:mm')

    // TODO: check how to improve class name
    node.className = "col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2"
    node.id = String(i)
    // Insert delete-button and text to div
    var taskNote = "<button id=\"xButton\" onclick=\"delTask(this);\">&#10007</button>" + "<h6>" + taskObj.taskName + "</h6>" + "<br/>" + "<div id=\"taskD\">" + taskObj.taskDesc + "</div>" + dateStr
    node.innerHTML = taskNote.replace(/\r|\n/g, "<br>")
    document.getElementById("taskRow").appendChild(node);
    // reset all fields after sumbitting a task
    console.log(typeof(taskObj.taskDate))
}

// delete task
function delTask(thisEl) {
    var elemId = thisEl.parentNode.id
    // delete from array
    taskList.splice(elemId, 1)
    loadAllTasks()
    // save the updated taskList to local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function clearAllTasks() {
    const myNode = document.getElementById("taskRow");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
}

// reset all fields by clear button
function clearFields() {
    document.getElementById("taskForm").reset();
}




// Tempus Dominus (date and time picker)
function taskDatePicker(){
    var taskDate = document.getElementById("taskDate").value;
    // console.log(taskDate)
    // switch to unix time
    var unixTime = Date.parse(taskDate);
    // create object
    // console.log(typeof(taskDate))

    const taskDateObj = moment(unixTime);
    console.log(taskDateObj.format('MMM Do YY'))
}
