const display = document.getElementById("display")
const button = document.getElementById("button")
const avgText = document.getElementById("averageTime")
let timer = null
let startTime
let elapsedTime = 0
let stopAfterTime = 3000
let mode = 1    // 1 = before test, 2 = during Test but Button isn't red yet, 3 = during Test and button is red
let historyLength = 0
let historySum = 0
let averageTime = 0

function handleClick(){
    if(mode === 1){
        start()
    } else {
        stop()
    }
}


function start(){
    if(mode === 1){
        stopAfterTime = Math.random() * 1500 + 2000
        startTime = Date.now()
        timer = setInterval(update, 1)
        mode = 2
        button.style.backgroundColor = "red"
        display.textContent = "Wait for Green ..."
    }
}

function stop(){
        clearInterval(timer)
        if (mode === 2) {
            display.textContent = "You Pressed To early"
            button.style.backgroundColor = "orange"
        } else if (mode === 3) {
            const currentTime2 = Date.now()
            reactionTime = currentTime2 - startTime
            display.textContent = reactionTime

            historyLength += 1
            historySum += reactionTime
            averageTime = Math.round(historySum / historyLength)
            avgText.textContent = "Your average reaction time is " + averageTime + "ms"

        }
        mode = 1
}

function update(){
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime

    if (elapsedTime >= stopAfterTime){
        display.textContent = "Press!"
        mode = 3
        button.style.backgroundColor = "#0dd10d"
        startTime = Date.now()
    }
}