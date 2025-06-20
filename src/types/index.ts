// 基礎類型定義

export interface AudioStateType {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

export interface UserProgressType {
  level: number;
  score: number;
  completedLessons: string[];
  achievements: string[];
}

export interface LessonType {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  exercises: ExerciseType[];
}

export interface ExerciseType {
  id: string;
  type: "interval" | "chord" | "scale" | "rhythm";
  instruction: string;
  audioUrl?: string;
  correctAnswer: string;
  options?: string[];
}

export interface GameConfigType {
  enableSound: boolean;
  autoPlay: boolean;
  showHints: boolean;
  difficulty: "easy" | "medium" | "hard";
}
