import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  to?: string;
  children: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ to = "/", children }) => {
  return (
    <Link to={to} className={styles.backButton}>
      ← {children}
    </Link>
  );
};

export default BackButton;
