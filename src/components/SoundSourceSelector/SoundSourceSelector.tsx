import React from "react";
import styles from "./SoundSourceSelector.module.css";

const SoundSourceSelector: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>聲音來源: 振盪器</h3>
      </div>
    </div>
  );
};

export default SoundSourceSelector;
