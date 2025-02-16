const corners = [0,2,6,8]
const middle = 4
const sides = [1,3,5,7]
const followcursor = document.getElementById("cursor")
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
let difficultyarray = [0,0,0];
let startedgame = false
let blockedlistcomp = []
let blockedlistplayer = []
var delay0, delay1, delay2, delay3;
let playername1;
let playername2 = "Computer"
let namecounter = 0


function countdown(num) {
    document.getElementById("countdown").innerHTML = `${num}`
}
 
function togglefunc(number) {
 
    const button = document.getElementById(number);
 
    if (togglestate[number] == 0 && activegame == true) {
 
        changecursor(player)        // Changes the cursor which shows a circle or cross depending on whose turn it is
        playerturns(number)         //  Changes which player's turn
        createacircle(number)       //  Creates circle
        togglestate[number] += 1;
        player = 1 - player         // Changes player
        activegame = true           // If game active, cannot remove circle
        activelist.splice(activelist.indexOf(number), 1)    //  Remove item from active list for computer
        checkwin()                  //  Check is one player has 3 in a row
        button.blur()               //  Stops the keyboard being able to click an element when it's in focus
        document.getElementById("whichturn").innerHTML = `${playername2}'s turn`
 
 
    } else if (activegame == false){
        removeelement(number)
        togglestate[number] = 1 - togglestate[number];

    }
 
    if (player == 1) {
        
        if (difficulty == 2) {
            ai()
        } else if (difficulty == 1) {
            computer()
        } else if (difficulty == 0) {
            //  pass
        }

        document.getElementById("whichturn").innerHTML = `${playername1}'s turn`

    } else {

        if (difficulty == 2) {
            document.getElementById("whichturn").innerHTML = `${playername1}'s turn`
        } else {
            //  pass
        }
    }
 
}
 
 
function checkwin(){


    const winscreen = document.getElementById("winscreen")
    if (playerturn >= 2){

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

                document.getElementById("array").innerHTML = `${playername1} has won!`
                locationcombination = x
                winner = playername1
                activegame = false
                addprogress(1)

            } else if (compresult == true){

                document.getElementById("array").innerHTML = `${playername2} has won!`
                locationcombination = x
                winner = playername2
                activegame = false
                addprogress(2)
            }
        }

        if (activelist.length == 0 && activegame == true) {    //  If all squares are filled but no combination (draw)

            winscreen.style.visibility = "visible"
            document.getElementById("winscreen").innerHTML = "It's a draw!"
            activegame = false
            changecursor(2)
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
                clearall();
                }, 3000)

            if (difficulty == 2) {
                delay3 = window.setTimeout(ai, 3000)
            }

        } else if (activegame == false && activelist.length >= 0){

            winscreen.style.visibility = "visible"
            if (winner == undefined) {
                winscreen.innerHTML = "It's a draw!"
            } else {
                winscreen.innerHTML = `${winner} has won!`
            }
            changecursor(2)
            drawline(locationcombination)

            let countdowntext = document.createElement("div")
            countdowntext.id = "countdown"
            winscreen.appendChild(countdowntext)


            countdown(3)
            delay0 = window.setTimeout(countdown, 1000, 2)
            delay1 = window.setTimeout(countdown, 2000, 1)
            delay2 = window.setTimeout(function () {
                // alert("/")
                winscreen.style.visibility = "hidden";
                clearall();
            }, 3000)

            if (difficulty == 2) {
                delay3 = window.setTimeout(ai, 3000)
            }

        } 


    }
}


//  Changes which players' turn it is
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
    } 
}
 

function ai() {

    let differencearraycomp = [];
    let differencecomp = [];
    let newdifferencecomp = [];
    let differencearrayplayer = [];
    let differenceplayer = [];
    let newdifferenceplayer = [];


    //  This checks the playervalue array for 2 in a row
    for (x = 0; x < 8 ; x++) {
        if(intersection(playervalue, winningcombinations[x]) == true) {
            let diff = winningcombinations[x].filter((value) => !playervalue.includes(value)).toString()
            differencearraycomp.push(diff);
        }
    }

    //  This checks the computervalue array for 2 in a row and creates a value call difference
    //  which is the value needed to complete the 3 in a row
    for (x = 0; x < 8 ; x++) {
        if(intersection(computervalue, winningcombinations[x]) == true) {
            let diff = winningcombinations[x].filter((value) => !computervalue.includes(value)).toString()
            differencearrayplayer.push(diff);
        }
    }

    //   If the other player has the "difference" it is placed in the blocked list
    //   which means the difference is removed from array
    differencecomp = differencearraycomp.filter(value => !blockedlistcomp.includes(value));
    differenceplayer = differencearrayplayer.filter(value => !blockedlistplayer.includes(value));

    //  Identical for the cpu but to check for wins
    newdifferencecomp = differencecomp.filter(value => !`${computervalue}`.includes(value));
    newdifferenceplayer = differenceplayer.filter(value => !`${playervalue}`.includes(value));

    console.log(`new difference is ${newdifferenceplayer}`)


    //  This algorithm works by assinging priorities
    //  Highest priority is to go first (either corner or center)

    //  Second is if there is only one more avaliable space on the board

    //  Third is if there is an opening in which the computer can complete a 3 in a row

    //  Fourth is if there is an opening in which the player only needs one position to get 3 in a row
    //  then the computer will block the position

    //  Then the computer checks if center is avaliable
    //  Lastly a random active position is clicked if all other options are not fulfilled


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

        //  Clicks for a winning 3 in a row
        } else if (computervalue.includes(differencecomp) == false && computervalue.length > 1 && newdifferenceplayer.length == 1) {

            document.getElementById(newdifferenceplayer).click()
            if ( !(newdifferenceplayer in blockedlistplayer)) {
                blockedlistplayer.push(newdifferenceplayer)
            }

        } else if (computervalue.includes(differencecomp) == false && computervalue.length > 1 && newdifferenceplayer.length > 1) {

            document.getElementById(newdifferenceplayer[0]).click()
            if ( !(newdifferenceplayer[0] in blockedlist)) {
                blockedlist.push(newdifferenceplayer[0])
            }

        //  Blocks a player 3 in a row
        } else if (newdifferencecomp.length == 1) {

            document.getElementById(newdifferencecomp).click()
            if ( !(newdifferencecomp in blockedlistcomp)) {
                blockedlistcomp.push(newdifferencecomp)
            }

        } else if (computervalue.includes(differencecomp) == false && computervalue.length > 1 && newdifferencecomp.length > 1) {
        
            console.log(`${newdifferencecomp[0]} is the difference`)
            document.getElementById(newdifferencecomp[0]).click()
            if ( !(newdifferencecomp[0] in blockedlist)) {
                blockedlist.push(newdifferencecomp[0])
            }

        } else if (activelist.includes(4)) {    //  If the center is avaliable

            document.getElementById("4").click();
            document.getElementById("4").blur();

        } else if (computervalue.length <= 2) { 

            const overlapcorner = corners.filter(value => activelist.includes(value))
            let randomcorner = Math.floor(Math.random() * overlapcorner.length)
            document.getElementById(overlapcorner[randomcorner]).click()

        } else if (computervalue.includes(newdifferenceplayer) == true) {

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
 

//  Reset some values to be able to keep playing the same difficulty
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


    //    Resets all values to restart game
    togglestate = [0,0,0,0,0,0,0,0,0]
    activelist = [0,1,2,3,4,5,6,7,8]
    player = 0
    activegame = true
    computerturn = 0, playerturn = 0;
    computervalue = [], playervalue = [];
    blockedlist = []
    gofirst = 1
    blockedlistcomp = []
    blockedlistplayer = []

    if (difficulty == 2) {
        gofirst = 0
        player = 1
    }

    changecursor(1 - player)

    if (difficulty == 1) {
        //  pass
    } else {
        document.getElementById("whichturn").innerHTML = `${playername1}'s turn`
    }
}


function drawline(winningposition){

    //  Gets position of the center of the squares
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

    //  Assings position to the winning line from above
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
    //  Places the line
    document.body.appendChild(line1);
}



//  The ability to skip the countdown to start the new round
document.addEventListener("pointerdown", function (event) {


    if (activegame == false && difficulty == 2) {

        disablebutton(true)

        window.clearTimeout(delay0)
        window.clearTimeout(delay1)
        window.clearTimeout(delay2)
        window.clearTimeout(delay3)

        if (document.getElementById("winline") != null) {
            document.getElementById("winline").remove();
        }

        winscreen.style.visibility = "hidden";
        clearall()
        disablebutton(false)
        ai()

    } else if (activegame == false) {

        window.clearTimeout(delay0)
        window.clearTimeout(delay1)
        window.clearTimeout(delay2)

        winscreen.style.visibility = "hidden";
        clearall()

    }

})


//  Extends the progress bar for the repective winner on the score board
function addprogress(number) {

    if (number == 1) {
        playerwin += 1
        document.getElementById("counter1").innerHTML = playerwin
    } else if (number == 2) {
        computerwin += 1
        document.getElementById("counter2").innerHTML = computerwin
    }

    let percent = document.getElementById(`progress${number}`).offsetWidth
    document.getElementById(`progress${number}`).style.width = `${percent + 20}px`

}


//      true = disable   false = enable
function disablebutton(boolean) {

    if (boolean == true) {
        for (x = 0; x < 8; x++) {
            const button = document.getElementById(`${x}`)
            button.disabled = true
        }
    } else if (boolean == false) {
        for (x = 0; x < 8; x++) {
            const button = document.getElementById(`${x}`)
            button.disabled = false
        }
    }

}

const easybutton = document.getElementById("buttoneasy")
const hardbutton = document.getElementById("buttonhard")
const twobutton = document.getElementById("buttontwoplayer")

// Changes color of the difficulty button and assigns a difficulty
easybutton.addEventListener("click", function (event) {

    document.getElementById("")
    if (difficultyarray.indexOf(1) == -1) {

        difficulty = 1
        difficultyarray[1] = 1
        easybutton.style.backgroundColor = "#4d41fc"
        document.querySelector(".nameinput").classList.add("slideout")
    
    } else {
        //  If there are already difficulty selected, it clears the other buttons and clicks this one
        difficultyarray = [0,0,0]
        hardbutton.style.backgroundColor = "#e97f96"
        twobutton.style.backgroundColor = "#63a7ff"
        difficultyarray[1] = 1
        easybutton.style.backgroundColor = "#4d41fc"

    }
})

hardbutton.addEventListener("click", function (event) {

    if (difficultyarray.indexOf(1) == -1) {

        difficulty = 2
        difficultyarray[2] = 1
        hardbutton.style.backgroundColor = "#4d41fc"
        document.getElementById("nameinput").classList.add("slideout")
    
    } else {

        difficultyarray = [0,0,0]
        easybutton.style.backgroundColor = "#b1abff"
        twobutton.style.backgroundColor = "#63a7ff"
        difficultyarray[2] = 1
        hardbutton.style.backgroundColor = "#4d41fc"

    }
})

twobutton.addEventListener("click", function (event) {

    if (difficultyarray.indexOf(1) == -1) {

        difficulty = 0
        difficultyarray[0] = 1
        twobutton.style.backgroundColor = "#4d41fc"
        document.getElementById("nameinput").classList.add("slideout")
    
    } else {

        difficultyarray = [0,0,0]
        hardbutton.style.backgroundColor = "#e97f96"
        easybutton.style.backgroundColor = "#b1abff"
        difficultyarray[0] = 1
        twobutton.style.backgroundColor = "#4d41fc"

    }
})


//  When the enter button is clicked it sends the input to the scoreboard
document.getElementById("enter").addEventListener("click", function (event) {

    //  If two player is selected, two player names will be required
    if (difficultyarray.indexOf(1) == 0 && namecounter == 0) {

        namecounter += 1
        playername1 = document.getElementById("nameinput").value
        document.getElementById("nameinput").value = ""
        document.getElementById("name1").innerHTML = playername1
        document.getElementById("nameinput").placeholder = "Enter the second name"
    } else if (difficultyarray.indexOf(1) == 0 && namecounter == 1) {

        playername2 = document.getElementById("nameinput").value
        document.getElementById("name2").innerHTML = playername2
        const inputverify = playername1.length > 0 ? begingame() : null;



    } else {

        playername1 = document.getElementById("nameinput").value
        document.getElementById("enter").classList.add("animation")
        document.getElementById("name1").innerHTML = playername1
        document.getElementById("name2").innerHTML = "Computer"
        const inputverify = playername1.length > 0 ? begingame() : null;
    }
})


//  This starts the game by hiding the starting menu screen and
//  lets the hard computer go first if hard is selected
function begingame() {

    let difficultylevel = difficultyarray.indexOf(1)

    if (difficultylevel == 0) {

        hidestartmenu()
        gofirst = 0
        player = 1
        
        document.getElementById("whichturn").innerHTML = (`${playername1}'s turn`)
        changecursor(0)

    } else if (difficultylevel == 1) {

        gofirst = 1
        player = 0
        // document.getElementById("popup").style.visibility = "hidden"
        hidestartmenu()
        changecursor(1)
        const delay = setTimeout(function () { document.getElementById("whichturn").innerHTML = `${playername1}'s turn` }, 500)

    } else if (difficultylevel == 2) {

        gofirst = 0
        player = 1
        
        hidestartmenu()
        const delay = setTimeout(ai, 800)  
        changecursor(1)

    }

}

//  Hides all elements of the starting menu screen
function hidestartmenu () {

    document.getElementById("popup").classList.add("slideleft")
    easybutton.classList.add("hide")
    hardbutton.classList.add("hide") 
    twobutton.classList.add("hide")
    document.querySelector("h1").classList.add("animation")
    document.getElementById("enter").classList.add("fadeout")
    document.getElementById("nameinput").classList.add("fadeout")

}

//  When the animation to hide the starting menu screen ends
//  javascript is used to manually change the css to keep its state
document.getElementById("buttoneasy").addEventListener("animationend", function (event) {

    const menu = document.getElementById("popup")
    document.getElementById("buttoneasy").style.opacity = "0"
    document.getElementById("buttonhard").style.opacity = "0"
    
    startedgame = true

    menu.style.display = "none"
    document.getElementById("menu").style.display = "flex"
    document.getElementById("circlebin").classList.add("fade")
    document.getElementById("circleeasy").classList.add("fade")
    document.getElementById("circlehard").classList.add("fade")
    document.getElementById("circletwo").classList.add("fade")


})


//  When the enter animation ends, it removed the animation class so it can be added back later
document.getElementById("enter").addEventListener("animationend", function (event) {
    document.getElementById("enter").classList.remove("animation")
})




//  Finds the elements which are common in two arrays if there are two common elements this returns true, else false
function intersection(arr1, arr2) {

    let combinationlocation = 0
    const common = arr1.filter(value => arr2.includes(value))

    if (common.length == 2) {
        return true
    } else {
        return false
    }

}

//  The naughts or cross indicator follows the cursor
document.body.addEventListener("pointermove", function (event) {

    //  Gets the position of the mose in the window
    //  This moves the div to the position
    followcursor.animate({
        left: `${event.clientX}px`,
        top: `${event.clientY}px`
    //  Slight delay to add smoothness
    }, {duration: 800, fill: "forwards"})

})

//  Alternates the cursor indicator
//   From circle to cross and vice versa
function changecursor(num) {

    if (num == 0) {
        //      Changes cursor to cross

        document.querySelector(".circleshape").style.display = "none"
        document.querySelector(".shape").style.display = "none"
        document.querySelector(".crosshape").style.display = "block"
        document.querySelector(".shapecross").style.display = "block"


    } else if (num == 1) {
        //      Changes cursor to circle

        document.querySelector(".circleshape").style.display = "block"
        document.querySelector(".shape").style.display = "block"
        document.querySelector(".crosshape").style.display = "none"
        document.querySelector(".shapecross").style.display = "none"

    } else if (num == 2) {
        //      Removes cursor

        document.querySelector(".circleshape").style.display = "none"
        document.querySelector(".shape").style.display = "none"
        document.querySelector(".crosshape").style.display = "none"
        document.querySelector(".shapecross").style.display = "none"

    }

}


//  Does a total reset of the game which allows the player to select a different mode to play against
function reshowmenu() {

    clearall()
    document.getElementById("whichturn").innerHTML = ""
    playerwin = 0, computerwin = 0
    difficulty = 2;  // 0 is two player      1 is random (easy) computer        2 is hard computer
    difficultyarray = [0,0,0];
    startedgame = false
    blockedlistcomp = []
    blockedlistplayer = []
    delay0, delay1, delay2, delay3;
    playername1;
    playername2 = "Computer"
    namecounter = 0

    document.getElementById("popup").classList.remove("slideleft")
    document.getElementById("popup").style.display = "block"
    document.getElementById("menu").style.display = "none"
    document.getElementById("buttoneasy").style.opacity = "1"
    document.getElementById("buttonhard").style.opacity = "1"


    document.getElementById("circlebin").classList.remove("fade")
    document.getElementById("circleeasy").classList.remove("fade")
    document.getElementById("circlehard").classList.remove("fade")
    document.getElementById("circletwo").classList.remove("fade")

    document.getElementById("popup").classList.remove("slideleft")
    easybutton.classList.remove("hide")
    hardbutton.classList.remove("hide") 
    twobutton.classList.remove("hide")
    document.querySelector("h1").classList.remove("animation")
    document.getElementById("enter").classList.remove("fadeout")
    document.getElementById("nameinput").classList.remove("fadeout")

    document.getElementById("name1").innerHTML = ""
    document.getElementById("name2").innerHTML = ""

    document.getElementById("buttonhard").style.backgroundColor = "#e97f96"
    document.getElementById("buttoneasy").style.backgroundColor = "#b1abff"
    document.getElementById("buttontwoplayer").style.backgroundColor = "#63a7ff"

    document.querySelector(".nameinput").classList.remove("slideout")
    document.getElementById("nameinput").value = ""

}


//  Sidebar buttons will reset the game and shows the starting menu
document.getElementById("circlebin").addEventListener("click", reshowmenu)
document.getElementById("circleeasy").addEventListener("click", reshowmenu)
document.getElementById("circlehard").addEventListener("click", reshowmenu)
document.getElementById("circletwo").addEventListener("click", reshowmenu)
