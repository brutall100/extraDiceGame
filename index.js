let player1Score = 0
let player2Score = 0
let player1Turn = false

const playerRandomBtn = document.getElementById("playerRandomBtn")
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

// Random player number BTN
playerRandomBtn.addEventListener("click",  function(){
    const randomNumPlayer = Math.floor(Math.random() * 2) + 1
    if (randomNumPlayer === 1) {
        player1Turn = true
    } else if (randomNumPlayer === 2) {
        player1Turn = false
    }
    message.textContent = "Player " + randomNumPlayer + " starts"
    rollBtn.style.display = "block"
    playerRandomBtn.style.display = "none"
})

// Roll BTN
 rollBtn.addEventListener("click", function() {
    let randomNumber = Math.floor(Math.random() * 6) + 3//

    if (player1Turn & randomNumber === 7) {
        player1Score += randomNumber + 3
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber + 3
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "EXTRA 10 Player 1 and Player 2 Turn↘️"
    }  
        else if (player1Turn & randomNumber === 8) {
        player1Score += randomNumber - 18
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber - 18
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "EXTRA -10 Player 1 and Player 2 Turn↘️"
    }   
        else if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "Player 2 Turn ↘️"
    }    
        else if (!player1Turn & randomNumber === 7) {
        player2Score += randomNumber + 3
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber + 3
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "EXTRA 10 player 2 and ↙️Player 1 Turn"
   }   
        else if (!player1Turn & randomNumber === 8) {
        player2Score += randomNumber - 18
        player2Scoreboard.textContent = player1Score
        player2Dice.textContent = randomNumber - 18
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "EXTRA -10 Player 2 and ↙️Player 1 Turn"
    } 
        else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.style.display = "block"
        message.textContent = "↙️ Player 1 Turn"
    }   
    
    if (player1Score >= 20) {
        message.style.display = "block"
        message.textContent = "Player 1 Won 🎇"
        player1Dice.classList.remove("active")
        player2Dice.classList.remove("active")
        player1Dice.classList.add("winer") 
        showResetButton()
    }  else if (player2Score >= 20) {
        message.style.display = "block"
        message.textContent = "Player 2 Won 🎉"
        player2Dice.classList.remove("active")
        player1Dice.classList.remove("active")
        player2Dice.classList.add("winer")  
        showResetButton()
    }
    player1Turn = !player1Turn
})

//Reset BTN 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.style.display = "block"
    message.textContent = "⬆️ Who will be first? ⬆️"
    resetBtn.style.display = "none"
    rollBtn.style.display = "none"
    playerRandomBtn.style.display = "block"
    player2Dice.classList.remove("winer") 
    player1Dice.classList.remove("winer") 
}

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}
