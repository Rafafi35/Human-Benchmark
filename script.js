const display = document.getElementById("display")
const button = document.getElementById("button")
let timer = null
let startTime
let elapsedTime = 0
let stopAfterTime = 3000
let isRunning = false

function handleClick(){
    if(!isRunning){
        start()
    } else {
        stop()
    }
}


function start(){
    if(!isRunning){
        stopAfterTime = Math.random() * 1500 + 2000
        console.log
        startTime = Date.now()
        timer = setInterval(update, 1)
        isRunning = true
        button.style.backgroundColor = "green"
    }
}

function stop(){
    if(isRunning){
        clearInterval(timer)
        elapsedTime = Date.now() - startTime
        isRunning = false
    }
}

function update(){
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime
    display.textContent = elapsedTime

    if (elapsedTime >= stopAfterTime){
        button.style.backgroundColor = "red"
        startTime = Date.now()
        const currentTime2 = Date.now()
        reactionTime = currentTime2 - startTime
        display.textContent = reactionTime
    }
}