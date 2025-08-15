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
let highscore = 0
let reihenfolge = []
let step = 0
let patternIsShowing = false
let clickingToStart = true
const grid = document.getElementById("grid")
const scoreDisplay = document.getElementById("memorizeScore")
const highscoreDisplay = document.getElementById("memorizeHighscore")

async function buttonClick(buttonIndex) {

    if (clickingToStart) {
        clickingToStart = false
        showPattern()
    } else {

        if (!patternIsShowing) {

            if (reihenfolge[step] === buttonIndex) {
                step++
                if (step === reihenfolge.length) {
                    step = 0
                    score += 1
                    scoreDisplay.textContent = score
                    if (score > highscore) {
                        highscore = score
                        highscoreDisplay.textContent = highscore
                    }
                    await showPattern()
                }

            } else {
                step = 0
                score = 0
                scoreDisplay.textContent = score
                reihenfolge = []
                clickingToStart = true
            }
        }
    }


}

async function showPattern() {

    patternIsShowing = true

    await sleep(600)

    let boxIndex = Math.floor(Math.random() * 9) + 1
    reihenfolge.push(boxIndex)
    for (let i = 0; i < reihenfolge.length; i++) {
        let box = grid.querySelector(`:nth-child(${reihenfolge[i]})`)
        box.style.backgroundColor = "yellow"
        await sleep(600)
        box.style.backgroundColor = ""
        await sleep(150)
    }

    patternIsShowing = false

}

//Attention Test

let attentionTestScore = 0
let boxX = 1
let boxY = 1
let box = ""
let previousBox = 11

function startAttentionTest() {
    const grid = document.getElementById("attentionGrid")

    boxX = Math.floor(Math.random() * 3) + 1
    boxY = Math.floor(Math.random() * 3) + 1

    if (previousBox == boxX + "" + boxY) {
        startAttentionTest()
    } else {

        previousBox = boxX + "" + boxY

        console.log("Next: " + boxX + "" + boxY)
        if (boxX === 1 && boxY === 1) {
            box = grid.querySelector(`:nth-child(7)`)
        }
        else if (boxX === 2 && boxY === 1) {
            box = grid.querySelector(`:nth-child(8)`)
        }
        else if (boxX === 3 && boxY === 1) {
            box = grid.querySelector(`:nth-child(9)`)
        }
        else if (boxX === 3 && boxY === 2) {
            box = grid.querySelector(`:nth-child(6)`)
        }
        else if (boxX === 2 && boxY === 2) {
            box = grid.querySelector(`:nth-child(5)`)
        }
        else if (boxX === 1 && boxY === 2) {
            box = grid.querySelector(`:nth-child(4)`)
        }
        else if (boxX === 3 && boxY === 3) {
            box = grid.querySelector(`:nth-child(3)`)
        }
        else if (boxX === 2 && boxY === 3) {
            box = grid.querySelector(`:nth-child(2)`)
        }
        else if (boxX === 1 && boxY === 3) {
            box = grid.querySelector(`:nth-child(1)`)
        }
        box.style.backgroundColor = "yellow"

        let abzufragendeAchse = "x"

        document.addEventListener("keypress", function handler(event) {
            if (abzufragendeAchse == "x") {
                if (event.key == boxX) {
                    console.log("x correct")
                    abzufragendeAchse = "y"
                } else {
                    box.style.backgroundColor = ""
                    document.removeEventListener("keypress", handler)
                    startAttentionTest()
                }
            } else if (abzufragendeAchse == "y") {
                if (event.key == boxY) {
                    console.log("y correct")
                    attentionTestScore++
                }
                box.style.backgroundColor = ""
                abzufragendeAchse = "x"
                document.removeEventListener("keypress", handler)
                startAttentionTest()
            }
        })
    }


}