import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface CircleButtonProps {
  onPress: () => void;
  color: string;
  children: React.ReactNode;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onPress, color, children }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<string[]>([]);
  const [isLap, setIsLap] = useState(false); // Biến để xác định trạng thái hiện tại của nút "Lap/Reset"

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 0.01);
      }, 10);
    } else {
      clearInterval(interval!);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const padStart = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = (time: number): string => {
    let seconds = Math.floor(time);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    seconds = seconds % 60;
    const milliseconds = Math.floor((time - Math.floor(time)) * 100).toString().padStart(2, '0');

    let str = `${padStart(minutes)}:${padStart(seconds)}.${milliseconds}`;

    if (hours > 0) {
      str = `${padStart(hours)}:${str}`;
    }

    return str;
  };

  const handleLapReset = () => {
    if (isRunning) {
      const lapTimeString = formatTime(time);
      const lapText = `Lap ${laps.length + 1}: ${lapTimeString}`;
      setLaps(prevLaps => [...prevLaps, lapText]);
      setIsLap(true); // Chuyển sang trạng thái Lap
    } else {
      setTime(0);
      setLaps([]);
      setIsLap(false); // Chuyển sang trạng thái Reset
    }
  };

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  return (
    <View style={styles.main}>
      <View style={styles.clock}>
        <Text style={[styles.clockText, { textAlign: 'right' }]}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttonArea}>
        <View style={styles.buttonRow}>
          <CircleButton onPress={handleLapReset} color={'gray'}>
            {isLap ? 'Lap' : 'Reset'}
          </CircleButton>
          <CircleButton onPress={handleStartStop} color={isRunning ? 'red' : 'green'}>
            {isRunning ? 'Stop' : 'Start'}
          </CircleButton>
        </View>
      </View>

      <View style={styles.rewriteArea}>
        {laps.map((lapText, index) => (
          <Text key={index} style={[styles.lapText, { textAlign: 'left' }]}>
            {lapText}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  clock: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    fontSize: 60,
  },
  buttonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  rewriteArea: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  lapText: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 20, // Thêm khoảng cách từ bên trái
  },
});

export default Stopwatch;
