

//TODO - Adding appropriate validation 

function saveTask(){
    var taskDetail=document.getElementById('taskDetail').value;
    var endDate=document.getElementById('endDate').value;
    var endHour=document.getElementById('endHour').value;

    if(taskDetail != "" && endDate != "" && checkDate() ){
        
            if(localStorage.getItem("indexTask") == undefined){
                localStorage.setItem("indexTask",0);
            }
            var task = { 
                'id' : localStorage.getItem("indexTask"),
                'taskDetail' : taskDetail,
                'endDate' : endDate,
                'endHour' : endHour
            }
            localStorage.setItem(task.id, JSON.stringify(task));
            addNote(localStorage.getItem("indexTask"));

            var x = parseInt(localStorage.getItem("indexTask"))+1
            localStorage.setItem("indexTask",x)
            document.getElementById("addTaskForm").reset();
            return false;
    }
}

function buildNotes(){

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        y = localStorage.key( i )
        if(y != "indexTask"){
            var taskObj1 = JSON.parse(localStorage.getItem(y))
            addNote(taskObj1.id);
        }
      }
}

function addNote(i){

    // fetching the "notes" section where all the notes are being saved
    notesBord = document.getElementById("notes");


    
    var taskObj = JSON.parse(localStorage.getItem(i))
    var task;
    var note;
    var spanEl;
    var spanDateEl;
    var spanTimeEl;
    var spanTextEl;

    // creating a wrapper div element for a task
    task = document.createElement("DIV");
    task.setAttribute("class","col-12 col-sm-12 col-md-6 col-lg-4 col-xl-2");


    var selectedDate = new Date(taskObj.endDate);
    var now = new Date();
    if (selectedDate < now) {
        task.setAttribute("class","ol-12 col-sm-12 col-md-6 col-lg-4 col-xl-2 pastNote");
    }
    task.setAttribute("id","note"+i);
    task.setAttribute("onmouseover","displayRemoveNote(this)");
    task.setAttribute("onmouseout","undisplayRemoveNote(this)");


    // creting an img elemet 
    note = document.createElement("IMG");
    note.setAttribute("src", "./imgs/notebg.png");
    note.setAttribute("class","note");

    
    // creating span element for exit
    spanEl = document.createElement("SPAN");
    spanEl.setAttribute("class","glyphicon glyphicon-remove glyphRemove");
    spanEl.setAttribute("onclick","deleteNote(this)");
    spanEl.setAttribute("id","removeNote"+i);

    // creating text span element
    spanTextEl = document.createElement('SPAN');
    spanTextEl.setAttribute("class","taskText");
    spanTextEl.innerText = taskObj.taskDetail;

    // creating date span element
    spanDateEl = document.createElement('SPAN');
    spanDateEl.setAttribute("class","taskDate");
    spanDateEl.innerHTML = taskObj.endDate;


    // creating time span element
    spanTimeEl = document.createElement('SPAN');
    spanTimeEl.setAttribute("class","taskTime");
    spanTimeEl.innerHTML = taskObj.endHour;

    
    // creating the entire note elements
    task.appendChild(spanEl);
    task.appendChild(note);
    task.appendChild(spanTextEl);
    task.appendChild(spanDateEl);
    task.appendChild(spanTimeEl);
    notesBord.appendChild(task);
}

function deleteNote(i){
    i= (i.id.slice(10));
    document.getElementById("note"+i).remove();
    localStorage.removeItem(i)
    
}

function displayRemoveNote(i){
    i= (i.id.slice(4));
    el = 'removeNote' + i;
    document.getElementById(el).style.visibility = "visible";
}

function undisplayRemoveNote(i){
    i= (i.id.slice(4));
    el = 'removeNote' + i;
    document.getElementById(el).style.visibility = "hidden";
}

// Date validation

function checkDate() {
    var selectedText = document.getElementById('endDate').value;
    var selectedDate = new Date(selectedText);
    var now = new Date();
    if (selectedDate < now) {
     alert("Date must be in the future");
     return false;
    }
    return true;
  }