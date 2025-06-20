// 音樂理論工具函數
export const frequencyToNote = (frequency: number): string => {
  const A4 = 440;
  const semitonesFromA4 = Math.round(12 * Math.log2(frequency / A4));
  const noteNames = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const noteIndex = ((semitonesFromA4 % 12) + 12) % 12;
  return noteNames[noteIndex];
};

export const noteToFrequency = (note: string, octave: number): number => {
  const A4 = 440;
  const noteValues = {
    C: -9,
    "C#": -8,
    D: -7,
    "D#": -6,
    E: -5,
    F: -4,
    "F#": -3,
    G: -2,
    "G#": -1,
    A: 0,
    "A#": 1,
    B: 2,
  };
  const semitones =
    noteValues[note as keyof typeof noteValues] + (octave - 4) * 12;
  return A4 * Math.pow(2, semitones / 12);
};

// 時間格式化函數
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// 分數計算函數
export const calculateScore = (
  correctAnswers: number,
  totalQuestions: number,
  difficulty: string
): number => {
  const baseScore = (correctAnswers / totalQuestions) * 100;
  const multipliers = { beginner: 1, intermediate: 1.5, advanced: 2 };
  return Math.round(
    baseScore * (multipliers[difficulty as keyof typeof multipliers] || 1)
  );
};

// localStorage 工具函數
export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return defaultValue;
  }
};
