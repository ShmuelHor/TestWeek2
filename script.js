const list_of_missions = [];
const main1 =  document.getElementById("main-1");
const main2 = document.getElementById("main-2");
const form = document.getElementById("form");
const fullName = document.getElementById("full-name-input");
const rank = document.getElementById("rank-input");
const position = document.getElementById("position-input");
const platoon = document.getElementById("platoon-input");
const missionTime =  document.getElementById("mission-time-input");
const statuss = document.getElementById("status-select");
const submit = document.getElementById("submit-button");
const table = document.getElementById("table");
const a = document.getElementById("a");

form.addEventListener('submit', function(event) {
    event.preventDefault();
});

if (localStorage.getItem('mission')) {
    list_of_missions.push(...JSON.parse(localStorage.getItem('mission')));
    TableViewer();
}


submit.addEventListener("click", CheckMission);

function CheckMission() {
    const mission = {
        fullName: fullName.value,
        rank: rank.value,
        position: position.value,
        platoon: platoon.value,
        status: statuss.value,
        missionTime : missionTime.value
    };

    list_of_missions.push(mission);
    saveToLocalStorage();
    TableViewer();
    
}

function TableViewer() {
    
    table.innerHTML = " ";

    list_of_missions.forEach(mission => {
        const tr1 = document.createElement("tr");
        const fullName1 = document.createElement("td");
        const rank1 = document.createElement("td");
        const position1 = document.createElement("td");
        const platoon1 = document.createElement("td");
        const status1 = document.createElement("td");
        fullName1.innerHTML = mission.fullName;
        rank1.innerHTML = mission.rank;
        position1.innerHTML = mission.position;
        platoon1.innerHTML = mission.platoon;
        status1.innerHTML = mission.status;

        const actions = document.createElement("td");
        const remove = document.createElement("button");
        const missionButton = document.createElement("button");
        const edit = document.createElement("button");
        
        remove.innerText = "remove";
        missionButton.innerText = "mission";
        edit.innerText = "edit";
        remove.classList.add('but-actions');
        missionButton.classList.add('but-actions');
        edit.classList.add('but-actions');
        let missionTime = mission.missionTime;
        missionButton.addEventListener("click", () => {
            function updateButton() {
                missionButton.innerText = `${missionTime}`;
                missionTime--;
                if (missionTime < 0) {
                    clearInterval(timerInterval);
                    status1.innerHTML = "R"
                    
                }
            }

            timerInterval = setInterval(updateButton, 1000);
            updateButton();
        });
        
        remove.addEventListener("click",()=>{
            list_of_missions.splice(list_of_missions.findIndex((num)=> num.fullName === mission.fullName),1)
            saveToLocalStorage();
            TableViewer();   
        })
        actions.appendChild(remove);
        actions.appendChild(missionButton);
        actions.appendChild(edit);


        tr1.appendChild(fullName1);
        tr1.appendChild(rank1);
        tr1.appendChild(position1);
        tr1.appendChild(platoon1);
        tr1.appendChild(status1);
        tr1.appendChild(actions);
        table.appendChild(tr1);
    });
    cline();
}

function cline(){
    fullName.value =" ";
    rank.value =" ";
    position.value = " ";
    platoon.value =" ";
    missionTime.value =" ";
}

function Timer(mission){
    
}

function saveToLocalStorage() {
    localStorage.setItem('mission', JSON.stringify(list_of_missions));
}

