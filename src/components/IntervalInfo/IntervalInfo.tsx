import React, { useState } from "react";
import styles from "./IntervalInfo.module.css";

interface IntervalData {
  chinese: string;
  english: string;
  semitones: number;
  nicknames?: string[];
  description: string;
}

interface IntervalInfoProps {
  interval: string;
  className?: string;
}

const intervalData: { [key: string]: IntervalData } = {
  小二度: {
    chinese: "小二度",
    english: "Minor 2nd (m2)",
    semitones: 1,
    description: "半音關係，最小的音程",
  },
  大二度: {
    chinese: "大二度",
    english: "Major 2nd (M2)",
    semitones: 2,
    description: "全音關係，相鄰音符的距離",
  },
  小三度: {
    chinese: "小三度",
    english: "Minor 3rd (m3)",
    semitones: 3,
    description: "小調和弦的特色音程",
  },
  大三度: {
    chinese: "大三度",
    english: "Major 3rd (M3)",
    semitones: 4,
    description: "大調和弦的特色音程",
  },
  純四度: {
    chinese: "純四度",
    english: "Perfect 4th (P4)",
    semitones: 5,
    description: "非常協和的音程",
  },
  增四度: {
    chinese: "增四度",
    english: "Tritone / Aug 4th",
    semitones: 6,
    nicknames: ["Devil's Interval", "♭5"],
    description: "三個全音，爵士樂常用，歷史上被稱為「魔鬼音程」",
  },
  純五度: {
    chinese: "純五度",
    english: "Perfect 5th (P5)",
    semitones: 7,
    description: "最協和的音程之一，和弦基礎",
  },
  小六度: {
    chinese: "小六度",
    english: "Minor 6th (m6)",
    semitones: 8,
    description: "憂鬱色彩的音程",
  },
  大六度: {
    chinese: "大六度",
    english: "Major 6th (M6)",
    semitones: 9,
    description: "明亮開闊的音程",
  },
  小七度: {
    chinese: "小七度",
    english: "Minor 7th (m7)",
    semitones: 10,
    description: "爵士和弦常用，略帶緊張感",
  },
  大七度: {
    chinese: "大七度",
    english: "Major 7th (M7)",
    semitones: 11,
    description: "高雅緊張的音程，現代和聲常用",
  },
  純八度: {
    chinese: "純八度",
    english: "Octave / Perfect 8th",
    semitones: 12,
    description: "相同音名，頻率為兩倍關係",
  },
};

const IntervalInfo: React.FC<IntervalInfoProps> = ({
  interval,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = intervalData[interval];

  if (!data) return <span className={className}>{interval}</span>;

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        {interval}
        <span className={styles.infoIcon}>ℹ️</span>
      </button>

      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h4>{data.chinese}</h4>
            <span className={styles.english}>{data.english}</span>
          </div>

          <div className={styles.popupContent}>
            <div className={styles.semitones}>{data.semitones} 個半音</div>

            {data.nicknames && (
              <div className={styles.nicknames}>
                <strong>別名：</strong>
                {data.nicknames.join(", ")}
              </div>
            )}

            <div className={styles.description}>{data.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntervalInfo;
