//REACTION TIME TEST

const displayReaction = document.getElementById("displayReaction")
const button = document.getElementById("reactionButton")
const avgText = document.getElementById("averageTime")
let timer = null
let startTime
let elapsedTime = 0
let stopAfterTime = 3000
let mode = 1    // 1 = before test, 2 = during Test but Button isn't red yet, 3 = during Test and button is red
let historyLength = 0
let historySum = 0
let averageTime = 0

function reactionClick() {
    if (mode === 1) {
        start()
    } else {
        stop()
    }
}


function start() {
    if (mode === 1) {
        stopAfterTime = Math.random() * 1500 + 2000
        startTime = Date.now()
        timer = setInterval(update, 1)
        mode = 2
        button.style.backgroundColor = "red"
        displayReaction.textContent = "Wait for Green ..."
    }
}

function stop() {
    clearInterval(timer)
    if (mode === 2) {
        displayReaction.textContent = "You Pressed To early"
        button.style.backgroundColor = "orange"
    } else if (mode === 3) {
        const currentTime2 = Date.now()
        reactionTime = currentTime2 - startTime
        displayReaction.textContent = reactionTime

        historyLength += 1
        historySum += reactionTime
        averageTime = Math.round(historySum / historyLength)
        avgText.textContent = "Your average reaction time is " + averageTime + "ms"

    }
    mode = 1
}

function update() {
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime

    if (elapsedTime >= stopAfterTime) {
        displayReaction.textContent = "Press!"
        mode = 3
        button.style.backgroundColor = "#0dd10d"
        startTime = Date.now()
    }
}

//CLICKS PER SECOND TEST

const displayCps = document.getElementById("displayCps")
const highscoreText = document.getElementById("highscoreText")
let cpsCount = 0
let cpsUpdate = null
let firstClick = true
let highestClicks = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cpsClick() {
    if (firstClick) {
        firstClick = false
        updateCps()
    }
    cpsCount += 1
    displayCps.textContent = cpsCount
    if (cpsCount > highestClicks) {
        highestClicks = cpsCount
        highscoreText.textContent = "Your highest CPS is " + cpsCount
    }

}

async function updateCps() {
    await sleep(1000);
    cpsCount = 0
    displayCps.textContent = cpsCount
    updateCps()
}

// Memorize Pattern
let score = 0
let reihenfolge = []
let step = 0
const grid = document.getElementById("grid")

async function buttonClick(buttonIndex) {



    if (reihenfolge[step] === buttonIndex) {
        console.log("richtig " + reihenfolge[step])
        step++
        if (step === reihenfolge.length) {
            console.log("Reihenfolge geschaft")
            await showPattern()
            step = 0
            score += 1

        }

    } else {
        console.log("flasch " + reihenfolge[step] + " = " + buttonIndex)
        step = 0
        reihenfolge = []
    }
}

async function showPattern() {

    await sleep(600)

    let boxIndex = Math.floor(Math.random() * 9) + 1
    reihenfolge.push(boxIndex)
    for (let i = 0; i < reihenfolge.length; i++) {
        let box = grid.querySelector(`:nth-child(${reihenfolge[i]})`)
        box.style.backgroundColor = "red"
        await sleep(600)
        box.style.backgroundColor = ""
        await sleep(300)
    }

}
