import React, { useState, useCallback } from "react";
import { soundEngine } from "../SoundEngine";
import Button from "../Button/Button";
import styles from "./NotePlayButton.module.css";

interface NotePlayButtonProps {
  note: string;
  octave: number;
  tuningStandard: number;
  label: string;
  className?: string;
}

const NotePlayButton: React.FC<NotePlayButtonProps> = ({
  note,
  octave,
  tuningStandard,
  label,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playNote = useCallback(async () => {
    if (isPlaying) return;

    setIsPlaying(true);

    try {
      await soundEngine.playNote(note, octave, tuningStandard);
    } catch (error) {
      console.error("播放音符失敗:", error);
    }

    // 播放時間
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  }, [note, octave, tuningStandard, isPlaying]);

  return (
    <Button
      onClick={playNote}
      disabled={isPlaying}
      className={`${styles.playButton} ${className} ${
        isPlaying ? styles.playing : ""
      }`}
    >
      <span className={styles.label}>{label}</span>
      {isPlaying && <span className={styles.playingIcon}>♪</span>}
    </Button>
  );
};

export default NotePlayButton;
