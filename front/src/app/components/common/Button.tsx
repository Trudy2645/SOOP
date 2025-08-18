// src/app/components/common/Button.tsx

import React, { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  // 기본 스타일(styles.button)과 추가 스타일(className)을 함께 적용합니다.
  // 이 부분이 원래 제안했던 코드와 동일합니다.
  const buttonClasses = `${styles.button} ${className || ''}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;