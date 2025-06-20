import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>🎵 InnerVoice</h1>
        <p>AI 驅動的音樂聽力與腦內聽覺訓練應用程式</p>

        <Link to="/demo" className={styles.demoLink}>
          🧪 進入 Demo 測試系統
        </Link>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎯</span>
            <h3>個人化AI學習</h3>
            <p>根據用戶特性提供客製化聽力訓練內容</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🧠</span>
            <h3>腦內聽覺訓練</h3>
            <p>專門針對 mental hearing 能力的練習單元</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎮</span>
            <h3>遊戲化體驗</h3>
            <p>情感反饋、鼓勵系統、評分與成就機制</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
