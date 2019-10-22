function checkPastTasks() {
    for (var i=0; i<notesArr.length; i++){
        const dateCheckerObj = notesArr[i];
    
        var willTheNoteTurnGray = false;
        willTheNoteTurnGray = willTheNoteTurnGray || validateThatTaskIsInThePast(dateCheckerObj.time, dateCheckerObj.date); 
        if (willTheNoteTurnGray) {
            recolorPastNotes(i);
        }
    }

}

function validateThatTaskIsInThePast(timechecker, datechecker) {
    var currDate = new Date();

        var datecheckerArr = datechecker.split("-");
        var reversedDatechecker = datecheckerArr.reverse();
        reversedDatechecker = datecheckerArr.join("-");


    var timeAndDateOfTask = new Date(reversedDatechecker + " " + timechecker);
    if (timechecker=="Whole Day"){
        timeAndDateOfTask = new Date(reversedDatechecker);
    }

    const noteDateWithoutTime = new Date(timeAndDateOfTask.getDate()        + " " +
                                         timeAndDateOfTask.getMonth()       + " " +
                                         timeAndDateOfTask.getFullYear());
    const currDateWithoutTime = new Date(currDate.getDate()                 + " " +
                                         currDate.getMonth()                + " " +
                                         currDate.getFullYear());

    const noteDateIncludingTime = timeAndDateOfTask.getTime();
    const currDateIncludingTime = currDate.getTime();

    if ((noteDateWithoutTime.valueOf() == currDateWithoutTime.valueOf()) && 
        (timechecker == "Whole Day")){
                return false;
        } else if (noteDateIncludingTime < currDateIncludingTime         ||
        noteDateWithoutTime < currDateWithoutTime)
        {
            return true;
    }
    return false;
}

function recolorPastNotes(dateCheckerObjIndex){
    document.getElementsByClassName("myDivStyle")[dateCheckerObjIndex].setAttribute("class", "myDivStyle grayNote fade-in");
}