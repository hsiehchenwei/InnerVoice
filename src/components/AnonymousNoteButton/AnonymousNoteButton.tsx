import React, { useState, useCallback } from "react";
import { soundEngine } from "../SoundEngine";
import Button from "../Button/Button";
import styles from "./AnonymousNoteButton.module.css";

interface AnonymousNoteButtonProps {
  note: string;
  octave: number;
  tuningStandard: number;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AnonymousNoteButton: React.FC<AnonymousNoteButtonProps> = ({
  note,
  octave,
  tuningStandard,
  label,
  onClick,
  disabled = false,
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

    // 短暫播放時間
    setTimeout(() => {
      setIsPlaying(false);
    }, 800);
  }, [note, octave, tuningStandard, isPlaying]);

  const handleClick = useCallback(() => {
    playNote();
    onClick?.();
  }, [playNote, onClick]);

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isPlaying}
      className={`${styles.anonymousButton} ${className} ${
        isPlaying ? styles.playing : ""
      }`}
    >
      <span className={styles.label}>{label}</span>
      {isPlaying && <span className={styles.playingIndicator}>♪</span>}
    </Button>
  );
};

export default AnonymousNoteButton;
