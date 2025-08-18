// src/app/features/FileUpload/page.tsx

'use client';

import React, { useRef, useState } from 'react';
import styles from './FileUpload.module.css';
import Button from '../../components/common/Button';

export default function FileUploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const handleAnalyzeClick = () => {
    alert('분석 시작 버튼이 클릭되었습니다.');
    // 실제 분석 로직 추가
  };

  // 텍스트 입력창을 클릭했을 때 파일 선택 창이 열리도록 하는 함수
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  // 파일이 선택되었을 때 파일 이름을 상태에 저장하는 함수
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
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
        <div className={styles.mainSection}>
          <div className={styles.uploadInfo}>
            <h2 className={styles.sectionTitle}>파일 업로드/BL 번호 추출</h2>
          </div>
          <div className={styles.uploadArea}>
            <div className={styles.inputAndButtonContainer}> {/* 이 부분을 새로 추가 */}
              <div className={styles.fileInputGroup}>
                <div className={styles.fileInputLabel}>파일 선택</div>
                <div className={styles.fileInputContainer} onClick={handleInputClick}>
                  <input
                    type="text"
                    placeholder="이미지나 PDF 파일을 선택하세요"
                    value={selectedFileName}
                    readOnly
                    className={styles.fileDisplayInput}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*, application/pdf"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
                <Button onClick={handleAnalyzeClick}>분석 시작</Button>
            </div>
          </div>
        </div>

        <div className={styles.otherSection}>
          <div className={styles.otherInfo}>
            <h2 className={styles.sectionTitle}>기타 설명</h2>
            <p className={styles.otherInfoText}>
              더 많은 정보를 추가로 보려면 아래를 확인하세요.
            </p>
          </div>
          <div className={styles.noteBox}>
            <h3 className={styles.noteTitle}>참고 사항</h3>
            <p className={styles.noteText}>
              화물 관련 정보를 꼭 확인하여야 하며, 필요한 경우 고객 지원팀에 문의하세요.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 화물 관리 시스템</p>
      </footer>
    </div>
  );
}