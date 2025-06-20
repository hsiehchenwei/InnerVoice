// 音樂理論常數
export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const STANDARD_PITCH = 440; // A4 = 440Hz

export const INTERVALS = {
  UNISON: 0,
  MINOR_2ND: 1,
  MAJOR_2ND: 2,
  MINOR_3RD: 3,
  MAJOR_3RD: 4,
  PERFECT_4TH: 5,
  TRITONE: 6,
  PERFECT_5TH: 7,
  MINOR_6TH: 8,
  MAJOR_6TH: 9,
  MINOR_7TH: 10,
  MAJOR_7TH: 11,
  OCTAVE: 12,
} as const;

// UI 常數
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1025,
} as const;

export const COLORS = {
  PRIMARY: "#667eea",
  SECONDARY: "#764ba2",
  ACCENT: "#ffd700",
  ERROR: "#ff6b6b",
  SUCCESS: "#51cf66",
} as const;

// 遊戲設定
export const DIFFICULTY_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export const SCORE_MULTIPLIERS = {
  BEGINNER: 1,
  INTERMEDIATE: 1.5,
  ADVANCED: 2,
} as const;
