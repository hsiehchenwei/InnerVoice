import React, { useState, useCallback, useEffect } from "react";
import Button from "../Button/Button";
import RootNotePlayer from "../RootNotePlayer/RootNotePlayer";
import NotePlayButton from "../NotePlayButton/NotePlayButton";
import ChoiceButton from "../ChoiceButton/ChoiceButton";
import IntervalInfo from "../IntervalInfo/IntervalInfo";
import styles from "./IntervalTrainingGame.module.css";

// 音程類型定義
type IntervalType =
  | "小二度"
  | "大二度"
  | "小三度"
  | "大三度"
  | "純四度"
  | "增四度"
  | "純五度"
  | "小六度"
  | "大六度"
  | "小七度"
  | "大七度"
  | "純八度";

// 遊戲狀態類型
type GameState = "ready" | "playing" | "answered" | "finished";

// 題目數據類型
interface Question {
  interval: IntervalType;
  correctNote: string;
  wrongNote: string;
  correctIndex: number; // 0 或 1，表示正確答案在哪個位置
}

// 遊戲統計類型
interface GameStats {
  currentRound: number;
  totalRounds: number;
  correctAnswers: number;
  accuracy: number;
}

const IntervalTrainingGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [rootNoteIsPlaying, setRootNoteIsPlaying] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    currentRound: 0,
    totalRounds: 10,
    correctAnswers: 0,
    accuracy: 0,
  });

  // 生成隨機題目
  const generateQuestion = useCallback((): Question => {
    const intervals: { name: IntervalType; semitones: number }[] = [
      { name: "小二度", semitones: 1 },
      { name: "大二度", semitones: 2 },
      { name: "小三度", semitones: 3 },
      { name: "大三度", semitones: 4 },
      { name: "純四度", semitones: 5 },
      { name: "增四度", semitones: 6 },
      { name: "純五度", semitones: 7 },
      { name: "小六度", semitones: 8 },
      { name: "大六度", semitones: 9 },
      { name: "小七度", semitones: 10 },
      { name: "大七度", semitones: 11 },
      { name: "純八度", semitones: 12 },
    ];

    const notes = [
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
    ];
    const randomInterval =
      intervals[Math.floor(Math.random() * intervals.length)];

    // C (index 0) + semitones
    const correctNoteIndex = randomInterval.semitones % 12;
    const correctNote = notes[correctNoteIndex];

    // 生成錯誤選項（相鄰半音或全音）
    const wrongOffset = Math.random() > 0.5 ? 1 : -1;
    const wrongNoteIndex = (correctNoteIndex + wrongOffset + 12) % 12;
    const wrongNote = notes[wrongNoteIndex];

    const correctIndex = Math.random() > 0.5 ? 0 : 1;

    return {
      interval: randomInterval.name,
      correctNote,
      wrongNote,
      correctIndex,
    };
  }, []);

  // 開始遊戲
  const startGame = useCallback(() => {
    setGameState("playing");
    setStats({
      currentRound: 1,
      totalRounds: 10,
      correctAnswers: 0,
      accuracy: 0,
    });
    const newQuestion = generateQuestion();
    setCurrentQuestion(newQuestion);
    setUserAnswer(null);
    setIsCorrect(null);
  }, [generateQuestion]);

  // 處理用戶答案
  const handleAnswer = useCallback(
    (answerIndex: number) => {
      if (gameState !== "playing" || userAnswer !== null) return;

      setUserAnswer(answerIndex);
      const correct = answerIndex === currentQuestion?.correctIndex;
      setIsCorrect(correct);
      setGameState("answered");

      if (correct) {
        setStats((prev) => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
          accuracy: Math.round(
            ((prev.correctAnswers + 1) / prev.currentRound) * 100
          ),
        }));
      } else {
        setStats((prev) => ({
          ...prev,
          accuracy: Math.round((prev.correctAnswers / prev.currentRound) * 100),
        }));
      }
    },
    [gameState, userAnswer, currentQuestion]
  );

  // 下一題
  const nextQuestion = useCallback(() => {
    if (stats.currentRound >= stats.totalRounds) {
      setGameState("finished");
      return;
    }

    setStats((prev) => ({ ...prev, currentRound: prev.currentRound + 1 }));
    const newQuestion = generateQuestion();
    setCurrentQuestion(newQuestion);
    setUserAnswer(null);
    setIsCorrect(null);
    setGameState("playing");
  }, [stats.currentRound, stats.totalRounds, generateQuestion]);

  // 重新開始
  const resetGame = useCallback(() => {
    setGameState("ready");
    setCurrentQuestion(null);
    setUserAnswer(null);
    setIsCorrect(null);
    setStats({
      currentRound: 0,
      totalRounds: 10,
      correctAnswers: 0,
      accuracy: 0,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🎵 音程聽力訓練</h2>
        <p className={styles.description}>聽辨 C 大調音程，訓練相對音感</p>
      </div>

      <div className={styles.gameCard}>
        {gameState === "ready" && (
          <div className={styles.readyState}>
            <div className={styles.instructions}>
              <h3>遊戲說明</h3>
              <ul>
                <li>根音 C 會持續播放</li>
                <li>選擇正確的音程音符</li>
                <li>共 10 題，測試你的音程聽辨能力</li>
              </ul>
            </div>
            <Button onClick={startGame}>開始挑戰</Button>
          </div>
        )}

        {(gameState === "playing" || gameState === "answered") &&
          currentQuestion && (
            <div className={styles.gameState}>
              <RootNotePlayer
                isPlaying={rootNoteIsPlaying}
                onToggle={setRootNoteIsPlaying}
                size="small"
                position="corner"
              />

              <div className={styles.progress}>
                <span>
                  第 {stats.currentRound} / {stats.totalRounds} 題
                </span>
                <span>正確率: {stats.accuracy}%</span>
              </div>

              <div className={styles.question}>
                <h3>
                  找出相對於根音 C 的：
                  <IntervalInfo interval={currentQuestion.interval} />
                </h3>
              </div>

              <div className={styles.options}>
                <div className={styles.optionGroup}>
                  <div className={styles.playButtonSection}>
                    <NotePlayButton
                      note={
                        currentQuestion.correctIndex === 0
                          ? currentQuestion.correctNote
                          : currentQuestion.wrongNote
                      }
                      octave={4}
                      tuningStandard={440}
                      label={
                        userAnswer !== null
                          ? `🔊 ${
                              currentQuestion.correctIndex === 0
                                ? currentQuestion.correctNote
                                : currentQuestion.wrongNote
                            }`
                          : "🔊 選項 A"
                      }
                      className={styles.playButton}
                    />
                  </div>
                </div>

                <div className={styles.optionGroup}>
                  <div className={styles.playButtonSection}>
                    <NotePlayButton
                      note={
                        currentQuestion.correctIndex === 1
                          ? currentQuestion.correctNote
                          : currentQuestion.wrongNote
                      }
                      octave={4}
                      tuningStandard={440}
                      label={
                        userAnswer !== null
                          ? `🔊 ${
                              currentQuestion.correctIndex === 1
                                ? currentQuestion.correctNote
                                : currentQuestion.wrongNote
                            }`
                          : "🔊 選項 B"
                      }
                      className={styles.playButton}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.choiceContainer}>
                <ChoiceButton
                  label="A"
                  onClick={() => handleAnswer(0)}
                  disabled={userAnswer !== null}
                  isSelected={userAnswer === 0}
                  isCorrect={userAnswer === 0 ? isCorrect : null}
                  className={styles.choiceBtn}
                />
                <ChoiceButton
                  label="B"
                  onClick={() => handleAnswer(1)}
                  disabled={userAnswer !== null}
                  isSelected={userAnswer === 1}
                  isCorrect={userAnswer === 1 ? isCorrect : null}
                  className={styles.choiceBtn}
                />
              </div>

              {gameState === "answered" && (
                <div className={styles.result}>
                  {isCorrect ? (
                    <div className={styles.correctResult}>
                      <span className={styles.emoji}>🎉</span>
                      <p>答對了！</p>
                    </div>
                  ) : (
                    <div className={styles.incorrectResult}>
                      <span className={styles.emoji}>😅</span>
                      <p>答錯了！</p>
                      <p className={styles.reveal}>
                        正確答案是：{currentQuestion.correctNote}
                      </p>
                      <p className={styles.reveal}>
                        你選的是：
                        {currentQuestion.correctIndex === 0
                          ? currentQuestion.wrongNote
                          : currentQuestion.correctNote}
                      </p>
                    </div>
                  )}

                  <Button onClick={nextQuestion}>
                    {stats.currentRound >= stats.totalRounds
                      ? "查看結果"
                      : "下一題"}
                  </Button>
                </div>
              )}
            </div>
          )}

        {gameState === "finished" && (
          <div className={styles.finishedState}>
            <h3>🎯 訓練完成！</h3>
            <div className={styles.finalStats}>
              <p>總題數：{stats.totalRounds}</p>
              <p>答對：{stats.correctAnswers}</p>
              <p>正確率：{stats.accuracy}%</p>
              <div className={styles.performance}>
                {stats.accuracy >= 80 && <span>🌟 優秀！音感很棒！</span>}
                {stats.accuracy >= 60 && stats.accuracy < 80 && (
                  <span>👍 不錯！繼續練習！</span>
                )}
                {stats.accuracy < 60 && (
                  <span>💪 多多練習，音感會進步的！</span>
                )}
              </div>
            </div>
            <Button onClick={resetGame}>再來一次</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntervalTrainingGame;
