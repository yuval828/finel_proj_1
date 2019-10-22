setInterval(function() {
    checkPastTasks();
}, 1000);

setInterval(function() {
    checkPastReminders();
}, 1000);

function checkPastReminders() {
    for (var i=0; i<remindersArr.length; i++){
        const reminderDateCheckerObj = remindersArr[i];
    
        var willTheReminderBeErased = false;
        willTheReminderBeErased = willTheReminderBeErased || validateThatReminderIsInThePast(reminderDateCheckerObj.reminderTime, reminderDateCheckerObj.reminderDate); 
        if (willTheReminderBeErased) {
            document.getElementsByClassName("reminderLog")[i].setAttribute("class", "reminderLog reminderIsInThePast");
            // here
        }
    }
}


function validateThatReminderIsInThePast(timechecker, datechecker) {
    var currDate = new Date();

        var datecheckerArr = datechecker.split("-");
        var reversedDatechecker = datecheckerArr.reverse();
        reversedDatechecker = datecheckerArr.join("-");


    var timeAndDateOfTask = new Date(reversedDatechecker + " " + timechecker);
    if (timechecker=="00:00"){
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
        (timechecker == "00:00")){
                return false;
        } else if (noteDateIncludingTime < currDateIncludingTime         ||
        noteDateWithoutTime < currDateWithoutTime)
        {
            return true;
    }
    return false;
}