'use client';

import React from 'react';
import styles from './Input.module.css';

// 'input' 태그가 받을 수 있는 모든 속성을 props 타입으로 정의합니다.
type InputProps = React.ComponentProps<'input'>;

export default function Input({ className, ...props }: InputProps) {
  // props로 받은 className과 기본 className을 함께 적용합니다.
  const combinedClassName = `${styles.input} ${className || ''}`;

  return (
    <input
      className={combinedClassName}
      {...props} // 받은 모든 속성들을 <input> 태그에 그대로 전달합니다.
    />
  );
}