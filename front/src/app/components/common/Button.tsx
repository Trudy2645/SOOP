import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode; // icon prop 추가
}

export default function Button({ children, icon, className, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {icon && <span className={styles.buttonIcon}>{icon}</span>} {/* 아이콘 렌더링 */}
      {children}
    </button>
  );
}