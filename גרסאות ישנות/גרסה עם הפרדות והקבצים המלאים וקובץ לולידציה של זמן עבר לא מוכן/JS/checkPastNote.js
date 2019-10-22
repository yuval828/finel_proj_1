setInterval(function checkPastNote() {
    let todayDate = new Date();
    for (let i = 0; i < noteList.length; i++) {
        let inputToDate = Date.parse(noteList[i].userEndTime);
        let todayToDate = Date.parse(todayDate);

        if (inputToDate < todayToDate) { //compare dates if input date is earlier will alert
            alert("the time of note: " + i + " is up!  please delete it.  Note text: " + noteList[i].noteText + " ,end time: "+ noteList[i].userEndTime);
        }
    }
},60000);
