// ---------- Game settings ----------
const WINNING_SCORE = 20

// The six faces of the "extra" dice. Each one is equally likely.
const FACES = [
    { points: 3 },
    { points: 4 },
    { points: 5 },
    { points: 6 },
    { points: 10, label: "+10", kind: "bonus" },
    { points: -10, label: "−10", kind: "penalty" },
]

// Where the dots sit on a 3 × 3 grid (cells 1–9, read like a book)
const PIPS = {
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
}

// ---------- Page elements ----------
const statusEl = document.getElementById("status")
const startBtn = document.getElementById("start-btn")
const rollBtn = document.getElementById("roll-btn")
const resetBtn = document.getElementById("reset-btn")

const players = [1, 2].map(function (n) {
    return {
        name: "Player " + n,
        card: document.getElementById("player-" + n),
        die: document.getElementById("die-" + n),
        scoreEl: document.getElementById("score-" + n),
        meter: document.getElementById("meter-" + n),
    }
})

// ---------- Game state ----------
let scores = [0, 0]
let current = null // index of the player whose turn it is (0 or 1)
let winner = null

// ---------- Helpers ----------
function randomIndex(length) {
    return Math.floor(Math.random() * length)
}

function drawDie(dieEl, face) {
    dieEl.replaceChildren()
    dieEl.classList.remove("is-bonus", "is-penalty", "is-empty")

    if (!face) {
        dieEl.classList.add("is-empty")
        dieEl.textContent = "?"
        return
    }

    if (face.kind) {
        dieEl.classList.add("is-" + face.kind)
        dieEl.textContent = face.label
        return
    }

    PIPS[face.points].forEach(function (cell) {
        const pip = document.createElement("span")
        pip.className = "pip"
        pip.style.gridArea = "p" + cell
        dieEl.append(pip)
    })
}

function shake(dieEl) {
    dieEl.classList.remove("is-rolling")
    void dieEl.offsetWidth // restart the animation
    dieEl.classList.add("is-rolling")
}

function render() {
    players.forEach(function (player, i) {
        player.scoreEl.textContent = scores[i]
        const percent = Math.min(Math.max(scores[i] / WINNING_SCORE, 0), 1) * 100
        player.meter.style.width = percent + "%"
        player.card.classList.toggle("is-active", i === current && winner === null)
        player.card.classList.toggle("is-winner", i === winner)
    })

    startBtn.hidden = current !== null
    rollBtn.hidden = current === null || winner !== null
    resetBtn.hidden = winner === null
}

// ---------- Actions ----------
function pickStarter() {
    current = randomIndex(2)
    statusEl.textContent = players[current].name + " starts. Roll the dice!"
    render()
    rollBtn.focus()
}

function roll() {
    const player = players[current]
    const face = FACES[randomIndex(FACES.length)]

    scores[current] += face.points
    drawDie(player.die, face)
    shake(player.die)

    const next = players[1 - current]

    if (scores[current] >= WINNING_SCORE) {
        winner = current
        statusEl.textContent = player.name + " wins with " + scores[current] + " points!"
    } else if (face.kind === "bonus") {
        statusEl.textContent = "Bonus! " + player.name + " gets +10. " + next.name + ", your turn."
    } else if (face.kind === "penalty") {
        statusEl.textContent = "Ouch! " + player.name + " loses 10. " + next.name + ", your turn."
    } else {
        statusEl.textContent = player.name + " rolled " + face.points + ". " + next.name + ", your turn."
    }

    if (winner === null) {
        current = 1 - current
    }
    render()

    if (winner !== null) {
        resetBtn.focus()
    }
}

function reset() {
    scores = [0, 0]
    current = null
    winner = null
    players.forEach(function (player) {
        drawDie(player.die, null)
    })
    statusEl.textContent = "Who goes first? Let the dice decide."
    render()
    startBtn.focus()
}

// ---------- Start ----------
startBtn.addEventListener("click", pickStarter)
rollBtn.addEventListener("click", roll)
resetBtn.addEventListener("click", reset)

// Draw the dots on the small dice in the rules section
document.querySelectorAll(".faces [data-face]").forEach(function (dieEl) {
    drawDie(dieEl, { points: Number(dieEl.dataset.face) })
})

players.forEach(function (player) {
    drawDie(player.die, null)
})
render()
