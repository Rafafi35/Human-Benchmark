const display = document.getElementById("display")
const button = document.getElementById("button")
let timer = null
let startTime
let elapsedTime = 0
let stopAfterTime = 3000
let mode = 1    // 1 = before test, 2 = during Test but Button isn't red yet, 3 = during Test and button is red

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
        button.style.backgroundColor = "green"
    }
}

function stop(){
        clearInterval(timer)
        if (mode === 2) {
            display.textContent = "You Pressed To early"
            button.style.backgroundColor = "orange"
        }
        mode = 1
}

function update(){
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime
    display.textContent = elapsedTime

    if (elapsedTime >= stopAfterTime){
        button.style.backgroundColor = "red"
        mode = 3
        startTime = Date.now()
        const currentTime2 = Date.now()
        reactionTime = currentTime2 - startTime
        display.textContent = reactionTime
    }
}