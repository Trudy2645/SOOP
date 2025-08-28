import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}></div>
          <h1 className={styles.companyName}>SOOP INTERNATIONAL CO.,LTD</h1>
        </div>
        <nav className={styles.authLinks}>
          <a href="#">로그인</a> / <a href="#">회원가입</a>
        </nav>
      </div>
    </header>
  );
}