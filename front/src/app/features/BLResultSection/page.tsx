// src/app/features/BLResultSection/page.tsx

'use client';

import React from 'react';
import styles from './BLResultSection.module.css';
import Button from '../../components/common/Button';
import buttonStyles from '../../components/common/Button.module.css'; // 이 부분을 추가합니다.


export default function BLResultPage() {
  const blNumber = "MGI12566036";

  const handleCopyClick = () => {
    // 클립보드 복사 로직
    if (navigator.clipboard) {
      navigator.clipboard.writeText(blNumber)
        .then(() => alert('BL 번호가 복사되었습니다.'))
        .catch(err => console.error('복사 실패:', err));
    } else {
      alert('클립보드 복사 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  const handleLoadInfoClick = () => {
    alert('화물 진행 정보 불러오기 버튼이 클릭되었습니다.');
    // 실제 화물 정보 로딩 로직
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}></div>
          <h1 className={styles.companyName}>SOOP INTERNATIONAL CO.,LTD</h1>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.resultContainer}>
          <h2 className={styles.sectionTitle}>분석한 BL 번호 결과</h2>
          <p className={styles.blNumber}>{blNumber}</p>
          <div className={styles.buttonGroup}>
    {/* '복사하기' 버튼은 styles.copyButton을 적용합니다. */}
    <Button onClick={handleCopyClick} className={styles.copyButton}>복사하기</Button>
    {/* '화물 진행 정보 불러오기' 버튼은 buttonStyles.button을 적용합니다. */}
    <Button onClick={handleLoadInfoClick} className={buttonStyles.button}>화물 진행 정보 불러오기</Button>
  </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 화물 관리 시스템</p>
      </footer>
    </div>
  );
}