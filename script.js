let squList = [];
let applyList = [];
let squareNumbers = "";
let screenHNumber = document.querySelectorAll(".screen--home .number")
let screenHome = document.querySelector(".screen--home");
let screenVote = document.querySelector(".screen--vote");
let screenChosen = document.querySelector(".screen--chosen");
let screenLoad = document.querySelector(".screen--chosen");
let notFound = false;
let keys = document.querySelectorAll(".keys .key");
let keyVote = screenVote.querySelectorAll(".number")
let voteOn = false;
let chosen = "";
let correctRepeat = false;



let notFoundMens = document.createElement("h3");
notFoundMens.innerHTML = "Party as been not found..."

//Function for the "X" on the info to close it self
function closeInfo(){
    document.querySelector(".party--stage").innerHTML = "";
    document.querySelector(".party--stage").style.display = "none"
    document.querySelector(".applicants--container").style.display = "flex";
};

//Applicant info filled with all information from our Json 
appList.forEach((item)=>{
    let applicant = document.querySelector(".model .applicant-info").cloneNode(true);

    document.querySelector(".applicants--container").append(applicant);
    applicant.querySelector(".applicant-info h2").innerHTML = item.number + " " + item.partyName;
    applicant.querySelector(".applicant-info h3").innerHTML = item.realName;
    
    applicant.addEventListener("click", (a)=>{
        a.preventDefault(a)

        let stage = document.querySelector(".party--stage");
        stage.style.display = "flex";
        document.querySelector(".applicants--container").style.display = "none";

        let party = document.querySelector(".model .party").cloneNode(true);
        stage.append(party)

        party.querySelector(".n-number").innerHTML = item.number;
        party.querySelector(".name-number .name-party").innerHTML = item.partyName;
        party.querySelector(".name-number .name-real").innerHTML = item.realName;

        let individualContainer = document.querySelector(".applicants--info .individual-info");
        let individual = item.applicant

        document.querySelector("side .close").addEventListener("click", closeInfo)
        
        individual.forEach((ind)=>{
            let person = document.querySelector(".model .applicant").cloneNode(true);
            individualContainer.append(person);
            
            person.querySelector(".image img").src = ind.img;
            person.querySelector(".name").innerHTML = ind.name;
            person.querySelector(".a-number").innerHTML = ind.number;

        })
    })
})

//Filling our candidate lists (squList and applyList) with the values from our Json
for(i in appList){

    squList.push(appList[i].number)

    appList[i].applicant.forEach((app)=>{
        applyList.push(parseInt(app.number))
   })

}



// Showing the Keys on the Home Squares
keys.forEach((key)=>{
    key.addEventListener("click", ()=>{
        if(screenHome.style.display != "none"){
            squareNumbers += key.innerHTML

            if(squareNumbers.length == 1){
                screenHNumber[0].classList.remove("selected")
                screenHNumber[1].classList.add("selected")
            }

            if(squareNumbers.length > 2){
                squareNumbers = "";
                squareNumbers += key.innerHTML
                screenHNumber[1].classList.add("selected")
            }
            
        screenHNumber[0].innerHTML = squareNumbers[0];

        if(squareNumbers.length == 2){
            screenHNumber[1].classList.remove("selected")
            screenHNumber[1].innerHTML = squareNumbers[1];
        }else{
            screenHNumber[1].innerHTML = "";
        }
        if(notFound == true){
            notFound = false;
            screenHome.removeChild(notFoundMens)
        }
        }

        if(voteOn == true){
            if(squareNumbers.length <= 3){  
            squareNumbers += key.innerHTML;

            keyVote.forEach((item, itemIndex, array) =>{
                if(squareNumbers.length > itemIndex){
                    item.innerHTML = squareNumbers[itemIndex]
                    if(itemIndex < array.length - 1){
                        item.classList.remove("selected")
                        array[itemIndex + 1].classList.add("selected");
                    }
                    if(itemIndex == array.length - 1){
                        item.classList.remove("selected")
                    }
                }
            })
                
            }
            

        }

        

    })
})


// Button Enter
document.querySelector(".btn--enter").addEventListener("click", ()=>{
   if(squList.findIndex((squ) => squ === parseInt(squareNumbers)) == -1 && voteOn == false){
    
    if(notFound == true){
        return
    }else{
        screenHome.appendChild(notFoundMens);
        notFound = true;
    }

    }else{
        if(voteOn == false){
            screenHome.style.display = "none"
            screenVote.style.display = "flex";
            
            chosen =  appList.find((item)=> item.number == parseInt(squareNumbers));
            squareNumbers = "";
        
            
            screenVote.querySelector(".partie h2 span").innerHTML = chosen.number;
            voteOn = true;
            console.log("Vote HOME")
            return
        }
   }
        if(voteOn == true){
            console.log("VoteOOONNN")
            if(chosen.applicant.findIndex((item)=> item.number == squareNumbers) === -1){
                console.log("Não existe!")
            }else{
                screenVote.style.display = "none";
                document.querySelector(".screen--loading").style.display = "flex";

                setInterval( ()=>{
                        
                        screenChosen.style.display = "flex";
                        document.querySelector(".screen--loading").style.display = "none";
            }, 2500)

            let date = new Date();
            let show = `${date.toUTCString()}`;
            let person = chosen.applicant.find((item) => item.number == squareNumbers);

            screenChosen.querySelector(".timer span").innerHTML = show;
            screenChosen.querySelector(".chosen--name span").innerHTML = person.name;
            screenChosen.querySelector(".chosen--number span").innerHTML = person.number;
            screenChosen.querySelector("img").src = person.img;
            }
        }
})

// Button Correct 
document.querySelector(".btn--correct").addEventListener("click", ()=>{
    if(voteOn == false){
        squareNumbers = squareNumbers.slice(0, squareNumbers.length - 1);
    
        if(squareNumbers[0] == undefined){
            screenHNumber[0].innerHTML = ""
        }else{
            screenHNumber[0].innerHTML = squareNumbers[0];
        }
    
        if(squareNumbers[1] == undefined){
            screenHNumber[1].innerHTML = "";
        }else{
            screenHNumber[1].innerHTML = squareNumbers[1];
        }
    } else {
        keyVote.forEach((item, index, array) =>{
                if(squareNumbers.length == index && squareNumbers.length > 0){
                    array[squareNumbers.length - 1].innerHTML = "";
                    array[squareNumbers.length - 1].classList.add("selected");
                    if(squareNumbers.length < array.length){
                        array[squareNumbers.length].classList.remove("selected")
                    }
                    squareNumbers = squareNumbers.slice(0, squareNumbers.length - 1);
            }
        })
        if(squareNumbers.length == 4){
            squareNumbers = squareNumbers.slice(0, squareNumbers.length - 1);
            keyVote[3].innerHTML = "";
            keyVote[3].classList.add("selected");
        }
        if(squareNumbers.length == 0 && correctRepeat == false){
            correctRepeat = true;
            return
        } if (correctRepeat == true){

            screenVote.style.display = "none";
            screenHome.style.display = "block";

            voteOn = false;
            squareNumbers = "";
            screenHome.querySelectorAll(".number").forEach((item)=>{
                item.innerHTML = "";
            })

            correctRepeat = false;
        }

    }
    
    
})
