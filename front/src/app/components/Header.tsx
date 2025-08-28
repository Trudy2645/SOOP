import React from 'react';
import Link from 'next/link'; // Link 컴포넌트를 import 합니다.
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Link 컴포넌트로 로고와 회사 이름을 감싸줍니다. */}
        <Link href="/features/FileUpload" className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <div className={styles.logoCircle}></div>
            <h1 className={styles.companyName}>SOOP INTERNATIONAL CO.,LTD</h1>
          </div>
        </Link>
        <nav className={styles.authLinks}>
          <a href="/login">로그인</a> / <a href="/signup">회원가입</a>
        </nav>
      </div>
    </header>
  );
}