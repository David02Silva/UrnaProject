let closeInfo = function(){
    document.querySelector(".party--stage").innerHTML = "";
    document.querySelector(".party--stage").style.display = "none"
    document.querySelector(".applicants--container").style.display = "flex";
}

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




