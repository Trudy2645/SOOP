'use client';

import React, { useRef, useState, useEffect, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import styles from './FileUpload.module.css';

export default function FileUploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 1. 파일을 '추가'하도록 로직 수정
  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      // 기존 파일 목록(prevFiles)에 새 파일 목록을 합쳐서 state 업데이트
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // 2. 파일 목록 전체 삭제 핸들러 추가
  const handleClearFiles = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSelectedFiles([]);
  };

  const handleTriggerFileInput = () => {
    // 파일 추가 시 input의 이전 값을 초기화해야 동일한 파일을 다시 추가할 수 있습니다.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (isAnalyzing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnalyzing) return;
    handleFileSelect(event.target.files);
  };

  const handleAnalyzeClick = () => {
    if (selectedFiles.length > 0) {
      setProgress(0);
      setIsAnalyzing(true);
    } else {
      alert('먼저 분석할 파일을 선택해주세요.');
    }
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); if (!isAnalyzing) setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isAnalyzing) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    if (!isAnalyzing || progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 100));
    }, 200);
    return () => clearInterval(interval);
  }, [isAnalyzing, progress]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        router.push('/features/CargoInfoTable');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  const dropZoneClass = `${styles.fileDropZone} ${selectedFiles.length > 0 ? styles.fileSelected : ''} ${isDragging ? styles.dragging : ''}`;

  return (
    <Layout>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadInfo}>
          <h1 className={styles.sectionTitle}>B/L & INOICE 파일 업로드</h1>
          <p className={styles.infoDescription}>
            B/L & INOICE 파일을 업로드하여 화물 정보를 자동으로 추출하세요.<br />
            문서를 분석하여 주요 정보를 빠르고 정확하게 인식합니다.<br />
            이미지 파일(JPG, PNG) 또는 PDF 파일을 지원
          </p>
        </div>
        <div className={styles.uploadActionCard}>
          <div 
            className={dropZoneClass} 
            onClick={handleTriggerFileInput}
            onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, application/pdf"
              style={{ display: "none" }}
              disabled={isAnalyzing}
              multiple
            />
            {selectedFiles.length === 0 ? (
              <>
                <div className={styles.dropZoneIcon}>📁</div>
                <p className={styles.dropZoneText}>파일을 드래그하거나<br/>클릭하여 추가하세요</p>
              </>
            ) : (
              <div className={styles.fileListContainer}>
                {/* 3. '전체 삭제' 버튼 UI 추가 */}
                <div className={styles.fileListHeader}>
                  <h3 className={styles.fileListTitle}>선택된 파일 ({selectedFiles.length}개)</h3>
                  <button onClick={handleClearFiles} className={styles.clearButton}>전체 삭제</button>
                </div>
                <ul className={styles.fileList}>
                  {selectedFiles.map((file, index) => (
                    <li key={index} className={styles.fileListItem}>
                      <span>📄</span> {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.dragOverlay}>여기에 파일들을 드롭하세요!</div>
          </div>
          <button className={styles.analyzeButton} onClick={handleAnalyzeClick} disabled={selectedFiles.length === 0 || isAnalyzing}>
            분석 시작
          </button>
          {isAnalyzing && (
            <div className={styles.progressSection}>
              <h2 className={styles.progressTitle}>문서 처리 중...</h2>
              <p className={styles.progressSubtitle}>문서에서 정보를 추출하고 UNIPASS API에서 추가 데이터를 가져오는 중입니다.</p>
              <div className={styles.progressBarBackground}><div className={styles.progressBarFill} style={{ width: `${progress}%` }} /></div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}