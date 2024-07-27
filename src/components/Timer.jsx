import { useState, useEffect, useRef } from "react";

// Possible States
// 0. IDLE
// 1. CHECKING
// 2. SOLVING
// 3. FINISHED

// Long <SPACE> press to move from IDLE to CHECKING
// Single <SPACE> press to move from CHECKING to SOLVING
// Single <SPACE> press to move from SOLVING to FINISHED
// Once FINISHED can only reset by button

const Stopwatch = () => {

  const [timerColor, SetTimerColor] = useState('#787d82')

  const [time, setTime] = useState(0);
  const [canStart, setCanStart] = useState(false);

  const [currentState, setCurrentState] = useState("IDLE");

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyUp = (event) => {
      interact(event);
    };

    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        if (currentState == "CHECKING" && timeoutRef.current == null) {
          SetTimerColor('#c94b4b')
          timeoutRef.current = setTimeout(() => {
            SetTimerColor('#339643')
            setCanStart(true);
          }, 1000);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentState, canStart]);

  const interact = (event) => {
    if (event.code === "Space") {
      
      switch (currentState) {
        case "IDLE":
          setCurrentState("CHECKING");
          intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 1000);
          break;

        case "CHECKING":
          SetTimerColor('#787d82')
          if (!canStart) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            return;
          }
          setCurrentState("SOLVING");
          clearInterval(intervalRef.current);
          setTime(0);
          intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 10);
          SetTimerColor('#787d82')
          break;
          
        case "SOLVING":
          clearInterval(intervalRef.current);
          setCurrentState("FINISHED");
          break;
      }
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setCanStart(false);
    setTime(0);
    setCurrentState("IDLE");
  };

  return (
    <h1 
      className={'mb-8 text-6xl font-mono'}
      style={{color:timerColor}}
    >

      {currentState === "CHECKING"
        ? `${time}`
        : `${(time / 100).toFixed(2)}`
      }

    </h1>

  );
};

export default Stopwatch;