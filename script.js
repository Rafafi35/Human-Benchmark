const display = document.getElementById("display")
let timer = null
let startTime
let elapsedTime = 0
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
        startTime = Date.now()
        timer = setInterval(update, 1)
        isRunning = true
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
}