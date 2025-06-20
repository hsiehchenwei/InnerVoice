import React, { useState, useCallback } from "react";
import BackButton from "../Navigation/BackButton";
import Button from "../Button/Button";
import NoteButton from "../NoteButton/NoteButton";
import SoundSourceSelector from "../SoundSourceSelector/SoundSourceSelector";
import styles from "./RandomNote.module.css";

const C_MAJOR_NOTES = ["C", "D", "E", "F", "G", "A", "B"];

const RandomNote: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("C");

  const generateRandomNote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * C_MAJOR_NOTES.length);
    const newNote = C_MAJOR_NOTES[randomIndex];
    setCurrentNote(newNote);
  }, []);

  return (
    <div className={styles.container}>
      <BackButton to="/demo">返回 Demo 列表</BackButton>
      <h1 className={styles.title}>隨機音符 Demo</h1>

      <SoundSourceSelector />

      <div className={styles.noteDisplay}>
        <NoteButton
          note={currentNote}
          octave={4}
          tuningStandard={440}
          label="A=440"
        />
        <NoteButton
          note={currentNote}
          octave={4}
          tuningStandard={442}
          label="A=442"
        />
      </div>

      <div className={styles.controls}>
        <Button onClick={generateRandomNote}>隨機換音</Button>
      </div>

      <div className={styles.info}>
        <p>C大調音階: {C_MAJOR_NOTES.join(" - ")}</p>
        <p>點擊音符按鈕播放聲音，比較 A=440Hz 和 A=442Hz 的差異</p>
      </div>
    </div>
  );
};

export default RandomNote;
