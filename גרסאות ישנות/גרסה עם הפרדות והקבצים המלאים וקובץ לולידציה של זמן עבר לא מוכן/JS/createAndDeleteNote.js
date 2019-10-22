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