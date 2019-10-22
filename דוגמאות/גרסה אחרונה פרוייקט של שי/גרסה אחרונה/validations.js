

function taskDateValidation(firstDateToCheck, inputDate, inputHour){
    let dateToCheck = new Date(inputDate);
    if(inputHour) {
        dateToCheck = new Date(inputDate + " " + inputHour);
    }

    if (inputHour==""                                        &&
    dateToCheck.getDate() == firstDateToCheck.getDate()              && 
    dateToCheck.getMonth() == firstDateToCheck.getMonth()            && 
    dateToCheck.getYear() == firstDateToCheck.getYear()              )
    {
        return true;
    } else if (dateToCheck.getTime() < firstDateToCheck.getTime())
    {
        changeDateFormHeaderAccordingToValidation();
        return false;
    } 
    return true;
}


function changeDateFormHeaderAccordingToValidation() {
    document.getElementById("timesetheader").innerText = "Plans are usually for the future.";
    setTimeout(function(){ document.getElementById("timesetheader").innerText = "Lets set up the time and date:"; }, 3000);
}

function changeContentFormBorderBack() {
    document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid white;border-radius: 6px;");
}


function contentValidation(input1BeingChecked, input2BeingChecked){
    if (input1BeingChecked==""){
        document.getElementById("contentOfTask").setAttribute("style", "width:100%;border: 1px solid red;border-radius: 6px;");
        return false;
    }
    if (input2BeingChecked==""){
        document.getElementById("dateOfTask").setAttribute("style", "border: 1px solid red;border-radius: 6px;");
        return false;
    }
    return true;
}

function getFormattedTime(inputTime){
    if (inputTime==""){
        var timeText = "Whole Day";
    } else {
        timeText = inputTime;
    }
    return timeText;
}