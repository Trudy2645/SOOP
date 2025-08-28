'use client';

import React from 'react';
import styles from './Button.module.css';

// 'button' 태그가 받을 수 있는 모든 속성을 props 타입으로 정의합니다.
type ButtonProps = React.ComponentProps<'button'>;

export default function Button({ children, className, ...props }: ButtonProps) {
  // props로 받은 className과 기본 className을 함께 적용합니다.
  const combinedClassName = `${styles.button} ${className || ''}`;
  
  return (
    <button
      className={combinedClassName}
      {...props} // 받은 모든 속성들을 <button> 태그에 그대로 전달합니다.
    >
      {children}
    </button>
  );
}