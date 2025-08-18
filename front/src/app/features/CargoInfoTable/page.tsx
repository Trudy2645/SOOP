// src/app/features/BLResultSection/page.tsx

'use client';

import React from 'react';
import styles from './CargoInfoTable.module.css';
import Button from '../../components/common/Button';
import buttonStyles from '../../components/common/Button.module.css';

export default function CargoInfoPage() {
  const cargoInfo = {
    blNumber: "MGI12566036",
    cargoId: 19,
    progressStatus: 300,
    progressStatusCode: 6,
    loadingCountry: 2,
    loadingCountryName: 300,
    mblNumber: 20,
    hblNumber: 20,
    destination: 150,
    destinationDept: 4,
    shippingCompany: 150,
    cargoType: 150,
    cargoTypeCode: 5,
    shippingCompany2: 150,
    cargoType2: 150,
    cargoTypeCode2: 5,
    shippingCompany3: 150,
    cargoType3: 150,
    cargoTypeCode3: 5,
    shippingCompany4: 150,
    cargoType4: 150,
    cargoTypeCode4: 5,
    containerType: 200,
    containerCountryCode: 2,
    loadingDate: 75,
  };

  const handleExcelDownloadClick = () => {
    alert('엑셀 다운로드 버튼이 클릭되었습니다.');
    // 엑셀 다운로드 로직
  };

  const handleCopyClick = () => {
    alert('복사하기 버튼이 클릭되었습니다.');
    // 복사 로직
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
          <div className={styles.titleWithButtons}>
            <h2 className={styles.sectionTitle}>화물 정보</h2>
            <div className={styles.buttonGroup}>
              <Button onClick={handleExcelDownloadClick} className={styles.copyButton}>엑셀로 다운로드</Button>
              <Button onClick={handleCopyClick} className={buttonStyles.button}>복사하기</Button>
            </div>
          </div>
          <p className={styles.infoDescription}>
            아래 정보를 복사하여 사용하세요.
          </p>
          <div className={styles.infoGrid}>
            {Object.entries(cargoInfo).map(([key, value]) => (
              <div key={key} className={styles.infoItem}>
                <label className={styles.infoLabel}>{key}</label>
                <input
                  type="text"
                  value={value}
                  readOnly
                  className={styles.infoInput}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 화물 관리 시스템</p>
      </footer>
    </div>
  );
}