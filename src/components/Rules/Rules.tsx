import React from "react";
import styles from "./Rules.module.css";

const Rules = () => {
  return (
    <ul className={styles.rules}>
      <li>
        Зажми <kbd>Shift</kbd> для выделения нескольких элементов
      </li>
      <li>
        <kbd>Shift</kbd> чтобы снять выделение
      </li>
      <li>
        <kbd>Backspace</kbd> для удаления элементов
      </li>
    </ul>
  );
};

export default Rules;
