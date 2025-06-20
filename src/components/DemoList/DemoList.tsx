import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../Navigation/BackButton";
import styles from "./DemoList.module.css";

interface DemoItem {
  id: string;
  name: string;
  path: string;
  description: string;
}

const demoItems: DemoItem[] = [
  {
    id: "random-note",
    name: "隨機音符",
    path: "/demo/random-note",
    description: "C大調八度音隨機播放",
  },
];

const DemoList: React.FC = () => {
  return (
    <div className={styles.container}>
      <BackButton>返回首頁</BackButton>
      <h1 className={styles.title}>Demo 測試系統</h1>
      <div className={styles.list}>
        {demoItems.map((item) => (
          <Link key={item.id} to={item.path} className={styles.demoCard}>
            <h3 className={styles.demoName}>{item.name}</h3>
            <p className={styles.demoDescription}>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DemoList;
