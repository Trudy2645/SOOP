'use client';

import React, { useRef, useState, useEffect, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import styles from './FileUpload.module.css';

export default function FileUploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const handleFileSelect = (file: File | undefined) => {
    if (file) setSelectedFile(file);
    else setSelectedFile(null);
  };

  const handleTriggerFileInput = () => {
    if (isAnalyzing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnalyzing) return;
    handleFileSelect(event.target.files?.[0]);
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
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
      handleFileSelect(e.dataTransfer.files?.[0]);
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

  const dropZoneClass = `${styles.fileDropZone} ${isDragging ? styles.dragging : ''} ${selectedFile ? styles.fileSelected : ''}`;
  const dropZoneText = selectedFile ? selectedFile.name : "파일을 드래그하거나\n클릭하여 선택하세요";

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
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*, application/pdf" style={{ display: "none" }} disabled={isAnalyzing} />
            <div className={styles.dropZoneIcon}>{selectedFile ? '📄' : '📁'}</div>
            <p className={styles.dropZoneText}>{dropZoneText}</p>
            <div className={styles.dragOverlay}>여기에 파일을 드롭하세요!</div>
          </div>
          <button className={styles.analyzeButton} onClick={handleAnalyzeClick} disabled={!selectedFile || isAnalyzing}>
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