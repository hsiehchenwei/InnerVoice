import React from "react";
import Button from "../Button/Button";
import styles from "./ChoiceButton.module.css";

interface ChoiceButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean | null;
  className?: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  label,
  onClick,
  disabled = false,
  isSelected = false,
  isCorrect = null,
  className = "",
}) => {
  let buttonClassName = `${styles.choiceButton} ${className}`;

  if (isSelected && isCorrect === true) {
    buttonClassName += ` ${styles.correct}`;
  } else if (isSelected && isCorrect === false) {
    buttonClassName += ` ${styles.incorrect}`;
  }

  return (
    <Button onClick={onClick} disabled={disabled} className={buttonClassName}>
      <span className={styles.label}>{label}</span>
      {isSelected && isCorrect === true && (
        <span className={styles.checkIcon}>✓</span>
      )}
      {isSelected && isCorrect === false && (
        <span className={styles.crossIcon}>✗</span>
      )}
    </Button>
  );
};

export default ChoiceButton;
