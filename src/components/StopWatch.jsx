import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - timeElapsed;
      intervalRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeElapsed(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90%] w-[70vw] bg-white m-5 md:m-10">
      <div className="text-4xl font-bold mb-4">{formatTime(timeElapsed)}</div>
      <div className="flex space-x-4">
        <button
          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
          onClick={startStopwatch}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
