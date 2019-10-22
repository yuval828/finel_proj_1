function sendASideNote(){

    var dateCheckForSpecialFeatures = new Date();
    
    if (notesArr.length==2){
        document.getElementById("sidenotes").innerHTML =
        `<section class="disappearingnote fade-in">
            </br>
                <b>
                    You go, busy ${personDescription}!
                    </br>
                    <img src="smiley.png" style="width:30px;height:30px;">
                </b>
            </br>
            </br>
        </section>`;
    }
    
        if (dateCheckForSpecialFeatures.getDay()==5   &&
            dateCheckForSpecialFeatures.getDate()==13 &&
            notesArr.length==4){
            document.getElementById("pageheadline").setAttribute("style","font-family:death_note;color:white;");
            document.getElementById("pageheadline").innerHTML = "DEATH NOTE";
            document.body.setAttribute("background","tile6.jpg");
            document.getElementById("formContainer").setAttribute("style","background-image: url('formbgfin5.png'); background-size: cover;")
            document.getElementById("contentsetheader").innerText = "Put in a name and the way of death:";
            document.getElementById("timesetheader").innerText = "When will the person die?";
    
            document.getElementById("sidenotes").innerHTML =
            `<section class="disappearingnote fade-in">
                </br>
                    <b>
                        You are the master of death!
                        </br>
                        <img src="deathnote.png" style="width:90px;height:30px;">
                    </b>
                </br>
                </br>
            </section>`;
        }
    
        if (notesArr.length==5){
            document.getElementById("sidenotes").innerHTML =
            `<section class="disappearingnote fade-in">
                </br>
                    <b>
                        You are a busy one!
                        </br>
                        <img src="smiley.png" style="width:30px;height:30px;">
                    </b>
                </br>
                </br>
            </section>`;
        }
    
        if (notesArr.length==8){
            document.getElementById("sidenotes").innerHTML =
            `<section class="disappearingnote fade-in">
                </br>
                    <b>
                        Don't strain yourself!
                        </br>
                        <img src="smart.png" style="width:30px;height:30px;">
                    </b>
                </br>
                </br>
            </section>`;
        }
    
    
        if (notesArr.length==10){
            document.getElementById("sidenotes").innerHTML =
            `<section class="disappearingnote fade-in">
                </br>
                    <b>
                        You are the master of this notice board!
                        </br>
                        <img src="strong.png" style="width:30px;height:30px;">
                    </b>
                </br>
                </br>
            </section>`;
        }
    
    }
    
    function fadeSideNoteOut(){
        document.getElementById("sidenotes").innerHTML = "";
    }