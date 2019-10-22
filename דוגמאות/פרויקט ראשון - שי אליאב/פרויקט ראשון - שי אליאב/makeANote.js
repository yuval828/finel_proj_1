function addNewNoteToDOM (contentOfTask, timeOfTask, reversedDate) {
    var divTag = document.createElement("div");
    document.getElementById("frameDiv1").appendChild(divTag); 
    divTag.setAttribute("class", "aba col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2");
    divTag.innerHTML =
        `<div class="wrapper">   
            <div class="pinStyle" style="background-image:url('pininwithshadow.png')";>
            </div>
            <div class="myDivStyle yellowNote fade-in">
                <div class="centerText"></div>
                <div class="containerDiv">
                    <span name="spanForCancel" class="iAmClassless"></span>
                    </br>
                    <fieldset style='width:85%; height:140px; border: 1px solid black; margin-left:6px; margin-top:2px;'>
                        <legend>
                            To Do:
                        </legend>
                        <div style="width:99%;height:88px;padding:5px;border: 1px solid red ;overflow-y:scroll;" class='pContentOfTask'>
                            `+contentOfTask+`
                        </div>
                    </fieldset>
                    <fieldset style='width:85%;height:50px;border: 1px'>
                        <div style='float:left;'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                Be ready at:
                            </span>
                        </div>
                        <div width:50%; length:50%; style='float:right;margin-right:10%;' class='pTimeOfTask'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                `+timeOfTask+`
                            </span>
                        </div>
                        </br>
                        <div style='float:left;'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                on:
                            </span>
                        </div>
                        <div width:50%; length:50%; style='float:right;margin-right:35%' class='pDateOfTask'>
                            <span style='font-size:12px;border:0px;margin:2px;padding:4px;'>
                                `+reversedDate+`
                            </span>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>`;
}