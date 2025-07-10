const display = document.getElementById("display")
let timer = null
let startTime
let elapsedTime = 0
let isRunning = false


function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime
        timer = setInterval(update, 1)
        isRunning = true
    }
}

function stop(){

}

function update(){
    const currentTime = Date.now()
    elapsedTime = currentTime - startTime

    display.textContent = elapsedTime
}