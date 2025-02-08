let togglestate = [0,0,0,0,0,0,0,0,0]
let activelist = [0,1,2,3,4,5,6,7,8]
let player = 0
let activegame = true
let computerturn = 0, playerturn = 0;
let computervalue = [], playervalue = [];
const winningcombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
//                            O O O                      0          0           0   0             0
//                                     0 0 0             0          0           0     0         0
//                                              0 0 0    0          0           0       0     0
let playerwin = 0, computerwin = 0


function countdown(num) {
    document.getElementById("countdown").innerHTML = `${num}`
}

 
function togglefunc(number) {
 
    const button = document.getElementById(number);
 
    // alert("Warning");
    if (togglestate[number] == 0 && activegame == true) {
 
        playerturns(number)
        createacircle(number)       //  Creates circle
        togglestate[number] += 1;
        player = 1 - player         // Changes player
        activegame = true           // If game active, cannot remove circle
        activelist.splice(activelist.indexOf(number), 1)    //  Remove item from active list for computer
        checkwin()
        button.blur()
 
 
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


    const winscreen = document.getElementById("winscreen")
    if (playerturn >= 3){

        let locationcombination;
        let winner;

        for (x = 0; x < 8; x++){
            // Iterates through every winning combination and whichs if the player's or computer's 
            // value matched the winning combination
            // The every() function checks through every value in one winning combination and checks if all three
            // exists inside either the player's or computer's value array
            const playerresult = winningcombinations[x].every(val => playervalue.includes(val));
            const compresult = winningcombinations[x].every(val => computervalue.includes(val));

            if (playerresult == true){

                document.getElementById("array").innerHTML = "Player has won!"
                locationcombination = x
                winner = "Player"
                activegame = false
                addprogress(1)

            } else if (compresult == true){

                document.getElementById("array").innerHTML = "Computer has won!"
                locationcombination = x
                winner = "Computer"
                activegame = false
                addprogress(2)
            }
        }

        if (activelist.length == 0 && activegame == true) {    //  If all squares are filled but no combination

            winscreen.style.visibility = "visible"
            document.getElementById("winscreen").innerHTML = "It's a draw!"
            activegame = false

            //  Adds countdown to the popup
            let countdowntext = document.createElement("div")
            countdowntext.id = "countdown"
            winscreen.appendChild(countdowntext)

            countdown(3)
            delay0 = window.setTimeout(countdown, 1000, 2)
            delay1 = window.setTimeout(countdown, 2000, 1)
            delay2 = window.setTimeout(function () {
                winscreen.style.visibility = "hidden";
                clearall();}, 3000)



        } else if (activegame == false && activelist.length > 0){

            winscreen.style.visibility = "visible"
            winscreen.innerHTML = winner
            drawline(locationcombination)

            let countdowntext = document.createElement("div")
            countdowntext.id = "countdown"
            winscreen.appendChild(countdowntext)


            countdown(3)
            delay0 = window.setTimeout(countdown, 1000, 2)
            delay1 = window.setTimeout(countdown, 2000, 1)
            delay2 = window.setTimeout(function () {
                winscreen.style.visibility = "hidden";
                clearall();}, 3000)

        }
    }
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
 
 
function computer() {
 
    if (activegame == true){
        //  Generates random untaken position
        let randm = Math.floor(Math.random() * activelist.length)
        let newvalue = activelist[randm]
        //  Clicks the position
        document.getElementById(newvalue).click()
        document.getElementById(newvalue).blur()
        checkwin()
    } 
}
 
 
function createacircle(id) {
 
    const newcontainer = document.createElement("div");  // Creates a new div
    const container = document.getElementById(`circle${id}`);// References the button for positioning
 
    if (player == 0){
        newcontainer.classList.add("circle");   //   Adds circle to div
    } else {
        newcontainer.classList.add("cross");    //   Or cross
    }
 
    container.appendChild(newcontainer);    //      Adds div to the button
 
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
    
    if (document.getElementById("winline") != null) {
        document.getElementById("winline").remove();
    }

    document.getElementById("array").innerHTML = "Click to start";


    //    Resets all values to restart game
    togglestate = [0,0,0,0,0,0,0,0,0]
    activelist = [0,1,2,3,4,5,6,7,8]
    player = 0
    activegame = true
    computerturn = 0, playerturn = 0;
    computervalue = [], playervalue = [];

}


function drawline(winningposition){

    let sidelength = document.getElementById("0").offsetWidth
    let row1 = document.getElementById("0").offsetTop + (0.5 * sidelength)
    let row2 = document.getElementById("3").offsetTop + (0.5 * sidelength)
    let row3 = document.getElementById("6").offsetTop + (0.5 * sidelength)

    let column1 = document.getElementById("0").offsetLeft + (0.5 * sidelength)
    let column2 = document.getElementById("1").offsetLeft + (0.5 * sidelength)
    let column3 = document.getElementById("2").offsetLeft + (0.5 * sidelength)

    let line1 = document.createElement("div");
    line1.id = "winline"
    line1.style.width = "45%";
    line1.style.height = "2%";
    line1.style.background = "rgba(96, 66, 255, 0.40)";
    line1.style.position = "absolute";
    line1.style.transform = "translate(-50%, -50%)"
    line1.style.transformOrigin = "0 0";

    if (winningposition == 0) {
        line1.style.left = `${column2}px`;
        line1.style.top = `${row1}px`;

    } else if (winningposition == 1) {
        line1.style.left = `${column2}px`;
        line1.style.top = `${row2}px`;
    
    } else if (winningposition == 2) {
        line1.style.left = `${column2}px`;
        line1.style.top = `${row3}px`;

    } else if (winningposition == 3) {
        line1.style.left = `${column1}px`;
        line1.style.top = `${row2}px`;
        line1.style.rotate = "90deg";


    } else if (winningposition == 4) {
        line1.style.left = `${column2}px`;
        line1.style.top = `${row2}px`;
        line1.style.rotate = "90deg";


    } else if (winningposition == 5) {
        line1.style.left = `${column3}px`;
        line1.style.top = `${row2}px`;
        line1.style.rotate = "90deg";


    } else if (winningposition == 6) {
        line1.style.left = "50%";
        line1.style.top = "50%";
        line1.style.rotate = "45deg";

    } else if (winningposition == 7) {
        line1.style.left = "50%";
        line1.style.top = "50%";
        line1.style.rotate = "135deg";

    }


    // line1.style.left = "50%";
    // line1.style.top = "50%";
    // line1.style.rotate = "45deg"


    document.body.appendChild(line1);
}

document.addEventListener("keydown", function (event) {

    if (event.key == "r") {
       // clearall()
    } else if (event.key == "a") {
        drawline()
    } else if (event.key == "o") {
        addprogress(2)
    } else if (event.code == "Space") {

        if (activegame == false) {

            window.clearTimeout(delay0)
            window.clearTimeout(delay1)
            window.clearTimeout(delay2)

            winscreen.style.visibility = "hidden";
            clearall()
        }

    }

})

document.addEventListener("pointerdown", function (event) {

    if (activegame == false) {

        window.clearTimeout(delay0)
        window.clearTimeout(delay1)
        window.clearTimeout(delay2)

        winscreen.style.visibility = "hidden";
        clearall()
    }

})

function addprogress(number) {

    if (number == 1) {
        playerwin += 1
        document.getElementById("counter1").innerHTML = playerwin
    } else if (number == 2) {
        computerwin += 1
        document.getElementById("counter2").innerHTML = computerwin
    }

    let percent = document.getElementById(`progress${number}`).offsetHeight
    document.getElementById(`progress${number}`).style.height = `${percent + 20}px`

}
