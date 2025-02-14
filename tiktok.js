const corners = [0,2,6,8]
const middle = 4
const sides = [1,3,5,7]
let gofirst = 0   //      0 computer starts       1 player starts
let togglestate = [0,0,0,0,0,0,0,0,0]
let activelist = [0,1,2,3,4,5,6,7,8]
let player = 1      // Change later currently 1 is for computer start 0 is player start
let activegame = true
let computerturn = 0, playerturn = 0;
let computervalue = [], playervalue = [];
const winningcombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
//                            O O O                      0          0           0   0             0
//                                     0 0 0             0          0           0     0         0
//                                              0 0 0    0          0           0       0     0
let playerwin = 0, computerwin = 0
let difficulty = 2;  // 0 is two player      1 is random (easy) computer        2 is hard computer
let startedgame = false
let blockedlist = []


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
        document.getElementById("whichturn").innerHTML = "Player 2's turn"
 
 
    } else if (activegame == false){
        removeelement(number)
        togglestate[number] = 1 - togglestate[number];

    }
 
    if (player == 1) {
        
        // Inline if statement
        difficulty == 2 ? ai() : computer()
        document.getElementById("whichturn").innerHTML = "Player 1's turn"

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
            drawline(8)

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



        } else if (activegame == false){

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
        document.getElementById(newvalue).click();
        document.getElementById(newvalue).blur();
        // checkwin()
    } 
}
 
// let differencearray = []


function ai() {

    let differencearray = []
    let difference = 0;


    for (x = 0; x < 8 ; x++) {
        if(intersection(playervalue, winningcombinations[x]) == true) {
            // console.log(x)
            let diff = winningcombinations[x].filter((value) => !playervalue.includes(value)).toString()
            differencearray.push(diff);
            // console.log(`difference is ${diff}`)
        }
    }
    
    difference = differencearray.filter(value => !blockedlist.includes(value)).toString();


    // console.log("ai");
    if (activegame == true) {

        //  Priority is to go first
        if (activelist.length == 9) {
            //  Bot either starts in center or corner

            let centerorcorner = Math.floor(Math.random() * 2)
            //  Generated either 0 or 1 randomly
            //  center is 0      corner is 1
            if (centerorcorner == 0) {

                document.getElementById("4").click()
                document.getElementById("4").blur();

            } else if (centerorcorner == 1) {

                // Picks a random corner at random
                let cornerlocation = Math.floor(Math.random() * corners.length);
                document.getElementById(`${corners[cornerlocation]}`).click();
                document.getElementById(`${corners[cornerlocation]}`).blur();
            }

        } else if (activelist.length == 1) {

            document.getElementById(activelist[0]).click()

        //  Second Priority is to block player if they're about to win
        } else if (computervalue.includes(difference) == false && computervalue.length > 1 && difference.length > 0) {
    
            console.log(`${difference} is the difference`)
            document.getElementById(difference).click()
            if ( !(difference in blockedlist)) {
                blockedlist.push(difference)
            }
            // blockedlist.push(difference)
            console.log("locked")
        

        } else if (activelist.includes(4)) {    //  If the center is avaliable

            document.getElementById("4").click();
            document.getElementById("4").blur();

        } else if (computervalue.length <= 2) { 

            const overlapcorner = corners.filter(value => activelist.includes(value))
            let randomcorner = Math.floor(Math.random() * overlapcorner.length)
            document.getElementById(overlapcorner[randomcorner]).click()

        } else if (computervalue.includes(difference) == true) {

            let random = Math.floor(Math.random() * activelist.length)
            document.getElementById(`${activelist[random]}`).click()

        } else {
            let random = Math.floor(Math.random() * activelist.length)
            document.getElementById(`${activelist[random]}`).click()
        }

        


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
    document.getElementById("whichturn").innerHTML = ""


    //    Resets all values to restart game
    togglestate = [0,0,0,0,0,0,0,0,0]
    activelist = [0,1,2,3,4,5,6,7,8]
    player = 0
    activegame = true
    computerturn = 0, playerturn = 0;
    computervalue = [], playervalue = [];
    blockedlist = []

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

    } else {

        line1.style.height = "0px"
        line1.style.width = "0px"
        console.log("draw")

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

function onloading() {

    if (gofirst == 0 || player == 1) {
        ai()
    }

}

const easybutton = document.getElementById("buttoneasy")
const hardbutton = document.getElementById("buttonhard")

easybutton.addEventListener("click", function (event) {
    difficulty = 1
    gofirst = 1
    player = 0
    // document.getElementById("popup").style.visibility = "hidden"
    document.getElementById("popup").classList.add("slideleft")
    document.getElementById("buttoneasy").classList.add("hide")
    document.getElementById("buttonhard").classList.add("hide")
    const delay = setTimeout(function () { document.getElementById("whichturn").innerHTML = ("Player 1's turn") }, 500)
    
})

hardbutton.addEventListener("click", function (event) {
    difficulty = 2
    gofirst = 0
    player = 1
    document.getElementById("popup").classList.add("slideleft")
    document.getElementById("buttoneasy").classList.add("hide")
    document.getElementById("buttonhard").classList.add("hide")  
    const delay = setTimeout(ai, 800)  
    document.getElementById("whichturn").innerHTML = ("Player 1's turn")
    
})


document.getElementById("buttoneasy").addEventListener("animationend", function (event) {

    const menu = document.getElementById("popup")
    // menu.style.left = "5%"
    // menu.style.top = "50%"
    // menu.style.width = "5rem"
    // menu.style.boxShadow = "0 1rem 1rem hsla(0, 0%, 0%, 0.068)"
    document.getElementById("buttoneasy").style.opacity = "0"
    document.getElementById("buttonhard").style.opacity = "0"
    // menu.classList.add("popup:hover")
    startedgame = true
    // menu.style.visibility = "hidden"
    menu.style.display = "none"
    document.getElementById("menu").style.display = "flex"
    document.getElementById("circlebin").classList.add("fade")
    document.getElementById("circleeasy").classList.add("fade")
    document.getElementById("circlehard").classList.add("fade")


})


document.addEventListener("keydown", function (event) {

    if (event.key == "r") {
        const buttoneasy = document.getElementById("buttoneasy")
        const buttonhard = document.getElementById("buttonhard")
        const popup = document.getElementById("popup")

        // document.getElementById("menu").style.visibility = "hidden"
        document.getElementById("menu").style.display = "none"
        // document.getElementById("popup").style.visibility = "visible"
        document.getElementById("popup").style.display = "block"
        buttoneasy.classList.remove("hide")
        buttonhard.classList.remove("hide")
        popup.classList.remove("slideleft")
        buttoneasy.style.opacity = 1
        buttonhard.style.opacity = 1
        clearall()
    } else if (event.key == "h") {

        document.getElementById("buttonhard").click()
    }

})


function intersection(arr1, arr2) {

    let combinationlocation = 0
    const common = arr1.filter(value => arr2.includes(value))

    if (common.length == 2) {
        return true
    } else {
        return false
    }

    //  Find the common values of player value and all 8 of the winningcombinations

    // let iftwo = (common.length == 2) ? alert("/") : console.log("not two")
    //  If the intersection of the arrays is two, meaning 1 move away from winning

    // for (x = 0; x < 8; x++) {
    //     let thirdvaluelocation = common.filter(value => winningcombinations[x].includes(value))
    //     if (thirdvaluelocation.length == 2) {
    //         combinationlocation = x
    //         console.log(`this is the location of the combination${x}`)
    //         console.log(thirdvaluelocation)

    //         let difference = winningcombinations[x].filter((value) => !arr1.includes(value));
    //         console.log(difference)
    //     }
    // }

    // let difference = winningcombinations[x].filter((value) => !arr1.includes(value));

}

// document.getElementById("popup").addEventListener("pointerenter", function (event) {

//     if (startedgame == true) {
//         function extend() {
//             let currentwidth = document.getElementById("popup").style.offsetWidth
//             let newwidth = currentwidth + 1
//             document.getElementById("popup").style.left = `${newwidth}rem`
//             if (newwidth < 50) {
//                 requestAnimationFrame(extend)
//             }
//         }
//         extend()
//     }

// })


// onloading()
