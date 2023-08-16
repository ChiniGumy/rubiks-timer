import { useEffect, useState, useRef } from "react";

function Timer() {

    const [timerColor, setTimerColor] = useState('#787d82');
    
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isReadyToRun, setIsReadyToRun] = useState(false);

    const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);
    const [elapsedMiliseconds, setElapsedMiliseconds] = useState();

    const intervalValue = useRef(null);

    const startTimer = () => {

        if (!isRunning) {
            intervalValue.current = setInterval(() => {
                setTime((time) => time + 0.01);
            }, 10);
            setIsRunning(true)
        }
    }

    useEffect(() => {
        document.onkeydown = function (e) {
            if (e.code === 'Space' && !isSpaceBarPressed) {
                if (isRunning) {
                    setIsRunning(false);
                    clearInterval(intervalValue.current)
                
                } else {
                    setIsSpaceBarPressed(true);
                    setTimerColor('#c94b4b');
                    setElapsedMiliseconds(Date.now());
                }
            }
        };

        document.onkeyup = function (e) {
            if (e.code === 'Space') {
                console.log('Dejaste de apretar la tecla espacio');
                setTimerColor('#787d82');
                setIsSpaceBarPressed(false);

                if (isReadyToRun) {
                    startTimer();
                }
            }
        };

        // Dentro de los useEffects, los returns sirven para limpiar valores seteados, timers, handlers, etc.
        
        return () => {
            document.onkeydown = null;
            document.onkeyup = null;
        };

    }, [elapsedMiliseconds, isSpaceBarPressed, isReadyToRun]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isSpaceBarPressed) {
                const now = Date.now();
                const elapsedSeconds = (now - elapsedMiliseconds) / 1000;
                
                if (!isRunning) {
                    if (elapsedSeconds >= 0.8) {
                        setTimerColor('#339643')
                        setIsReadyToRun(true)
                    }
                }
            }
        }, 100);
        
        return () => {
            clearInterval(interval);
        };

    }, [isSpaceBarPressed, elapsedMiliseconds]);

    return (
        <span
            className={'mb-8 text-6xl font-mono'}
            style={{ color: timerColor }}
        >
            {time.toFixed(2)}
        </span>
    );
}

export default Timer;