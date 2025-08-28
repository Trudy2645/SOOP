import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>© 화물 관리 시스템</span>
        <div className={styles.footerLinks}>
          <a href="#">개인정보 처리방침</a>
          <a href="#">이용약관</a>
        </div>
      </div>
    </footer>
  );
}