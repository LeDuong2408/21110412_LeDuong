import React, { useState } from 'react';
import Stopwatch from './Stopwatch'; 

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]); // Danh sách các laps

  // Hàm bắt đầu đếm thời gian
  const startTimer = () => {
    setIsRunning(true);
  };

  // Hàm dừng đếm thời gian
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Hàm reset thời gian và danh sách các laps
  const resetTimer = () => {
    setIsRunning(false); // Dừng đếm thời gian
    setLaps([]); // Xóa danh sách các laps
  };

  // Hàm lưu lại một lap mới
  const lapTimer = () => {
    // Format thời gian hiện tại
    const currentTime = new Date().toLocaleTimeString();
    // Tạo lap mới từ thời gian hiện tại
    const lapText = `Lap ${laps.length + 1}: ${currentTime}`;
    // Thêm lap mới vào danh sách các laps
    setLaps(prevLaps => [...prevLaps, lapText]);
  };

  return (
    <Stopwatch
      isRunning={isRunning}
      start={startTimer}
      stop={stopTimer}
      reset={resetTimer}
      lap={lapTimer}
      laps={laps} // Truyền danh sách các laps vào component Stopwatch
    />
  );
};

export default App;
