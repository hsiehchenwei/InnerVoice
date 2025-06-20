import React, { useState } from "react";
import { audioPlayer } from "../SoundEngine";
import styles from "./NoteButton.module.css";

interface NoteButtonProps {
  note: string;
  octave?: number;
  tuningStandard?: number;
  label?: string;
}

const NoteButton: React.FC<NoteButtonProps> = ({
  note,
  octave = 4,
  tuningStandard = 440,
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleClick = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await audioPlayer.playNote(note, octave, tuningStandard);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      className={styles.noteButton}
    >
      <span className={styles.noteName}>{note}</span>
      {label && <span className={styles.tuningLabel}>{label}</span>}
      {isPlaying && <span className={styles.playingIndicator}>♪</span>}
    </button>
  );
};

export default NoteButton;
