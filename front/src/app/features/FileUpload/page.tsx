'use client';

import React, { useRef, useState, useEffect, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FileUpload.module.css';

export default function FileUploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // 파일이 선택되었을 때(클릭 또는 드롭) 처리하는 공통 함수
  const handleFileSelect = (file: File | undefined) => {
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  // 분석 중이 아닐 때만 파일 선택 창을 여는 함수
  const handleTriggerFileInput = () => {
    if (isAnalyzing) return;
    fileInputRef.current?.click();
  };

  // 파일 선택(클릭) 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnalyzing) return;
    handleFileSelect(event.target.files?.[0]);
  };

  // '분석 시작' 버튼 클릭 핸들러
  const handleAnalyzeClick = () => {
    if (selectedFileName) {
      setProgress(0);
      setIsAnalyzing(true);
    } else {
      alert('먼저 분석할 파일을 선택해주세요.');
    }
  };
  
  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isAnalyzing) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isAnalyzing) {
      handleFileSelect(e.dataTransfer.files?.[0]);
    }
  };

  // ## useEffect 로직 수정 ##
  // 프로그레스바 타이머를 위한 useEffect
  useEffect(() => {
    if (!isAnalyzing || progress >= 100) return;

    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 100));
    }, 200);

    return () => clearInterval(interval);
  }, [isAnalyzing, progress]);

  // 페이지 이동을 위한 별도의 useEffect
  useEffect(() => {
    if (progress >= 100) {
      // 짧은 딜레이 후 이동하여 100% 상태를 잠시 보여줍니다.
      const timer = setTimeout(() => {
        router.push('/features/CargoInfoTable');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  const dropZoneClass = `${styles.fileDropZone} ${isDragging ? styles.dragging : ''}`;

  return (
    <div className={styles.pageContainer}>
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

      <main className={styles.mainContent}>
        <div className={styles.uploadCard}>
          <h1 className={styles.title}>B/L</h1>
          <p className={styles.subtitle}>B/L 문서를 업로드하세요</p>
          <div 
            className={dropZoneClass} 
            onClick={handleTriggerFileInput}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, application/pdf"
              style={{ display: "none" }}
              disabled={isAnalyzing}
            />
            <p className={styles.dropZoneText}>
              {selectedFileName ? selectedFileName : "파일을 드래그하거나\n선택하세요"}
            </p>
          </div>
          <button
            className={styles.analyzeButton}
            onClick={handleAnalyzeClick}
            disabled={!selectedFileName || isAnalyzing}
          >
            분석 시작
          </button>

          {isAnalyzing && (
            <div className={styles.progressSection}>
              <h2 className={styles.progressTitle}>문서 처리 중...</h2>
              <p className={styles.progressSubtitle}>
                문서에서 정보를 추출하고 UNIPASS API에서 추가 데이터를 가져오는 중입니다.
              </p>
              <div className={styles.progressBarBackground}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
         <div className={styles.footerContent}>
          <span>© 화물 관리 시스템</span>
          <div className={styles.footerLinks}>
            <a href="#">개인정보 처리방침</a>
            <a href="#">이용약관</a>
          </div>
        </div>
      </footer>
    </div>
  );
}