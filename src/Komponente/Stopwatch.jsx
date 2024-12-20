import {useState, useEffect, useRef} from "react";
function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const [startStopValue, setStartStopValue] = useState("start");
    const delayUpdate = () => {
        setTimeout(() => {
                setIsRunning(true)
                startTimeRef.current = Date.now() - elapsedTime
                setStartStopValue("stop");

        }, 2000);
    };


    useEffect(() => {

        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 1)
        }
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning]);


    function buttonClicked(){
        if (startStopValue === "start") {
            setElapsedTime(0)
            setStartStopValue("getReady")
            delayUpdate()
        }

        else if (startStopValue === "getReady") {
            setIsRunning(false)
            clearTimeout(delayUpdate)
            setStartStopValue("start")
        }

        else if (startStopValue === "stop") {
            setIsRunning(false)
            setStartStopValue("start")
        }
    }


    return(
        <>
            <div className={"stopwatch"}>
                <div className={"display"}>
                    {elapsedTime + "ms"}
                </div>
                
                <div>
                    <button
                        onClick={buttonClicked}
                        className={startStopValue}>
                        {startStopValue}
                    </button>
                </div>
            </div>
        </>

    )
}

export default Stopwatch