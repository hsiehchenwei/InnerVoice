import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "../Button/Button";
import styles from "./RootNotePlayer.module.css";

interface RootNotePlayerProps {
  note?: string;
  octave?: number;
  tuningStandard?: number;
  isPlaying?: boolean;
  onToggle?: (playing: boolean) => void;
  size?: "normal" | "small";
  position?: "center" | "corner";
}

const RootNotePlayer: React.FC<RootNotePlayerProps> = ({
  note = "C",
  octave = 4,
  tuningStandard = 440,
  isPlaying = false,
  onToggle,
  size = "normal",
  position = "center",
}) => {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playing = isPlaying || internalPlaying;

  // 計算音符頻率
  const getNoteFrequency = useCallback(
    (note: string, octave: number, tuningStandard: number): number => {
      const noteMap: { [key: string]: number } = {
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

      const semitoneFromA4 = noteMap[note] + (octave - 4) * 12;
      return tuningStandard * Math.pow(2, semitoneFromA4 / 12);
    },
    []
  );

  const startPlaying = useCallback(() => {
    if (playing || oscillatorRef.current) return;

    try {
      // 創建音頻上下文
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const ctx = audioContextRef.current;

      // 創建增益節點
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
      gainNodeRef.current.gain.setValueAtTime(0.1, ctx.currentTime); // 降低音量

      // 創建主振盪器 (基頻)
      const frequency = getNoteFrequency(note, octave, tuningStandard);
      oscillatorRef.current = ctx.createOscillator();
      oscillatorRef.current.type = "sine";
      oscillatorRef.current.frequency.setValueAtTime(
        frequency,
        ctx.currentTime
      );

      // 添加泛音 (2倍頻和3倍頻)
      const harmonic2 = ctx.createOscillator();
      harmonic2.type = "sine";
      harmonic2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

      const harmonic3 = ctx.createOscillator();
      harmonic3.type = "sine";
      harmonic3.frequency.setValueAtTime(frequency * 3, ctx.currentTime);

      // 創建泛音的增益節點
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      gain2.gain.setValueAtTime(0.03, ctx.currentTime); // 2倍頻較輕
      gain3.gain.setValueAtTime(0.01, ctx.currentTime); // 3倍頻更輕

      // 連接音頻節點
      oscillatorRef.current.connect(gainNodeRef.current);
      harmonic2.connect(gain2);
      harmonic3.connect(gain3);
      gain2.connect(gainNodeRef.current);
      gain3.connect(gainNodeRef.current);

      // 開始播放
      oscillatorRef.current.start();
      harmonic2.start();
      harmonic3.start();

      if (onToggle) {
        onToggle(true);
      } else {
        setInternalPlaying(true);
      }
    } catch (error) {
      console.error("開始播放根音失敗:", error);
    }
  }, [playing, note, octave, tuningStandard, onToggle, getNoteFrequency]);

  const stopPlaying = useCallback(() => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      gainNodeRef.current = null;

      if (onToggle) {
        onToggle(false);
      } else {
        setInternalPlaying(false);
      }
    } catch (error) {
      console.error("停止播放根音失敗:", error);
    }
  }, [onToggle]);

  const togglePlaying = useCallback(() => {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }, [playing, startPlaying, stopPlaying]);

  // 清理
  useEffect(() => {
    return () => {
      stopPlaying();
    };
  }, [stopPlaying]);

  // 外部控制播放狀態
  useEffect(() => {
    if (isPlaying && !playing) {
      startPlaying();
    } else if (!isPlaying && playing) {
      stopPlaying();
    }
  }, [isPlaying, playing, startPlaying, stopPlaying]);

  return (
    <div
      className={`${styles.container} ${
        position === "corner" ? styles.corner : styles.center
      }`}
    >
      <Button
        onClick={togglePlaying}
        className={`${styles.toggleButton} ${playing ? styles.playing : ""} ${
          size === "small" ? styles.small : ""
        }`}
      >
        {playing ? "停止根音" : "根音播放"}
      </Button>
    </div>
  );
};

export default RootNotePlayer;
