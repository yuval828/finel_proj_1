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