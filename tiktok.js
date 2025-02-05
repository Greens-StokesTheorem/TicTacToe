let togglestate = [0,0,0,0,0,0,0,0,0]
let activelist = [0,1,2,3,4,5,6,7,8]
let player = 0
let activegame = false
let computerturn = 0, playerturn = 0;
let computervalue = [], playervalue = [];
const winningvalues = [6,102,504,28,80,162,105,45]
const winningcombinations = [[0,1,2], [3,4,5], [7,8,9], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

 
 
function togglefunc(number) {
 
    const button = document.getElementById(number);
 
    // alert("Warning");
    if (togglestate[number] == 0) {
 
        playerturns(number)
        createacircle(number)       //  Creates circle
        togglestate[number] += 1;
        player = 1 - player         // Changes player
        activegame = true           // If game active, cannot remove circle
        activelist.splice(activelist.indexOf(number), 1)    //  Remove item from active list for computer
        checkwin()
 
 
    } else if (activegame == false){
        removeelement(number)
        togglestate[number] = 1 - togglestate[number];

    }
 
    if (player == 1) {
        computer()
    } else {
        //pass
    }
 
 
}
 
 
function checkwin(){
 
    // if (playerturn >= 3 && winningvalues.includes(playervalue)){

    //     document.getElementById("array").innerHTML = "Player has won!"

 
    // } else if (computerturn >= 3 && winningvalues.includes(computervalue)){
    //     document.getElementById("array").innerHTML = "Computer has won!"
 
    // }

    if (playerturn >= 3){

        for (x = 0; x < 8; x++){
            const playerresult = winningcombinations[x].every(val => playervalue.includes(val));
            const compresult = winningcombinations[x].every(val => computervalue.includes(val));

            if (playerresult == true){
                document.getElementById("array").innerHTML = "Player has won!"
                console.log(x)
            } else if (compresult == true){
                document.getElementById("array").innerHTML = "Computer has won!"
                console.log(x)

            }
        }
    }

    // const playerresult = playervalue.every(val => winningcombinations.includes(val));
    // const compresult = computervalue.every(val => winningcombinations.includes(val));



    // if (playerturn >= 3 && playerresult == true){
    //     document.getElementById("array").innerHTML = "Player has won!"

 
    // } else if (computerturn >= 3 && compresult == true){
    //     document.getElementById("array").innerHTML = "Computer has won!"
 
    // }
 
}
 
function playerturns(num){
 
    if (player == "0"){
        playerturn += 1
        playervalue.push(num)
    } else {
        computerturn += 1
        computervalue.push(num)
    }
 
}
 
function makeelement() {
 
    const newdiv = document.createElement("div");
    const newcircle = document.createAttribute("circle");
 
    newdiv.appendChild(newcircle);
    document.body.insertBefore(newdiv)
 
}
 
function computer() {
 
    let randm = Math.floor(Math.random() * activelist.length)
    let newvalue = activelist[randm]
    document.getElementById(newvalue).click()
 
}
 
 
function createacircle(id) {
 
    const newcontainer = document.createElement("div");  // Creates a new div
    const container = document.getElementById(`circle${id}`);// References the button
 
    if (player == 0){
        newcontainer.classList.add("circle");   //              Adds circle to div
    } else {
        newcontainer.classList.add("cross");
    }
 
    container.appendChild(newcontainer);    //              Adds div to the button
 
}
 
 
function removeelement(id){
 
    const container = document.getElementById(`circle${id}`);
    const newcontainer = document.querySelector(`#circle${id} .circle`);
 
    if (container && newcontainer) {
            container.removeChild(newcontainer);
    }
 
}
 
function clearall(){
 
    for (x = 0; x < 9; x++){
 
        const container = document.getElementById(`circle${x}`)
        const newcontainercircle = document.querySelector(`#circle${x} .circle`);
        const newcontainercross = document.querySelector(`#circle${x} .cross`);
 
        if (container && newcontainercircle) {
            container.removeChild(newcontainercircle);
 
        }  else if(container && newcontainercross) {
            container.removeChild(newcontainercross);
        }
 
    }
 
    document.getElementById("array").innerHTML = "Click to start"
    computerturn = 0
    playerturn = 0
    computervalue = []
    playervalue = []
    togglestate = [0,0,0,0,0,0,0,0,0]
    activelist = [0,1,2,3,4,5,6,7,8]
    player = 0
}


function drawwinningline(){

    const newcontainer = document.createElement("div");  // Creates a new div
    const container = document.getElementById("gridbox");// References the button
 
    newcontainer.classList.add("line");
    container.appendChild(newcontainer)

}