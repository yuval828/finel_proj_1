switch (NT){
    case "Whole Day":
            if ((CD <  RD <= ND) &&
            (CT <  RT)){
                return true;
            }
    default:
            switch (RT) {
                case "3:00:00":
                        if (CD <  RD <= ND){
                            changeTimeOfReminderToZero(RT);
                            RT = tempRT;
                            return true;
                        }  else if (CD <= RD <= ND){
                            alert("You didn't specify the time, so here's your reminder... It's today.");
                            return false;
                        }
                case "2:00:00":
                        if (CD <  RD <= ND){
                            changeTimeOfReminderToZero(RT);
                            RT = tempRT;
                            return true;
                        }  else if (CD <= RD <= ND){
                            alert("You didn't specify the time, so here's your reminder... It's today.");
                            return false;
                        }
                default:
                        if ((CD <  RD <= ND)  ||
                        (CD <= RD == ND)  &&
                        (RT  <  NT)
                        ){
                            return true;
                        }
                        return false;
                    }
            }

    // if ((currDate <  reminderToCheck < taskDateToCheck)){
    //     return true;
    // }
    // return false;



    // if (((RT!="3:00:00") && (RT!="2:00:00")) && NT){
    //     if ((CD <  RD <= ND)  ||
    //         (CD <= RD == ND)  &&
    //         (RT  <  NT)
    //         ){
    //             return true;
    //         }
    //         return false;
    //     }
    
    // if ((RT=="3:00:00") || (RT=="2:00:00")){
    //     if (CD <  RD <= ND){
    //         changeTimeOfReminderToZero(RT);
    //         RT = tempRT;
    //         return true;
    //     }  else if (CD <= RD <= ND){
    //         alert("You didn't specify the time, so here's your reminder... It's today.");
    //         return false;
    //     }
    // }

    // if (NT=="Whole Day"){
    //     if ((CD <  RD <= ND) &&
    //         (CT <  RT)){
    //             return true;
    //         }
    //     return false;
    // }
    // return false;