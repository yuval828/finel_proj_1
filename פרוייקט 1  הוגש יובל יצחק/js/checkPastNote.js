setInterval(function checkPastNote() {
    let todayDate = new Date();
    for (let i = 0; i < noteList.length; i++) {
        let inputToDate = Date.parse(noteList[i].userEndTime);
        let todayToDate = Date.parse(todayDate);

        if (inputToDate < todayToDate) { //compare dates if input date is earlier will alert
            alert("The time of note: " + i + " is up! \nPlease delete it.  \nNote text: " + noteList[i].noteText + " ,\nEnd time: " + noteList[i].userEndTime);
        }
    }
}, 60000);