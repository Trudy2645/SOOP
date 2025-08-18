// src/app/components/common/Input.tsx

import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.input}
    />
  );
};

export default Input;