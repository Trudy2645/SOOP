'use client';

import React, { useRef, useState, useEffect, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import styles from './FileUpload.module.css';

// 파일 타입을 정의합니다. 'bl' 또는 'invoice'
type FileType = 'bl' | 'invoice';

export default function FileUploadPage() {
  // 두 개의 파일 입력을 위한 Ref 생성
  const blFileInputRef = useRef<HTMLInputElement | null>(null);
  const invoiceFileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // B/L과 INVOICE 파일을 별도로 관리하는 State
  const [selectedFiles, setSelectedFiles] = useState<{ bl: File | null; invoice: File | null }>({ bl: null, invoice: null });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // 드래그 상태를 파일 타입별로 관리
  const [dragging, setDragging] = useState<FileType | null>(null);

  // 파일 선택을 처리하는 핸들러
  const handleFileSelect = (file: File | undefined, type: FileType) => {
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  // 파일 입력 창을 여는 핸들러
  const handleTriggerFileInput = (type: FileType) => {
    if (isAnalyzing) return;
    if (type === 'bl') blFileInputRef.current?.click();
    else invoiceFileInputRef.current?.click();
  };
  
  // 파일 삭제를 처리하는 핸들러
  const handleClearFile = (type: FileType, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFiles(prev => ({ ...prev, [type]: null }));
    // input 값 초기화 (동일한 파일 재선택을 위해)
    const ref = type === 'bl' ? blFileInputRef : invoiceFileInputRef;
    if (ref.current) ref.current.value = "";
  };
  
  // 드래그 관련 이벤트 핸들러
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = (e: DragEvent<HTMLDivElement>, type: FileType) => { e.preventDefault(); if (!isAnalyzing) setDragging(type); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(null); };
  const handleDrop = (e: DragEvent<HTMLDivElement>, type: FileType) => {
    e.preventDefault();
    setDragging(null);
    if (!isAnalyzing) {
      handleFileSelect(e.dataTransfer.files?.[0], type);
    }
  };

  // '분석 시작' 버튼 클릭 핸들러
  const handleAnalyzeClick = () => {
    if (selectedFiles.bl && selectedFiles.invoice) {
      setProgress(0);
      setIsAnalyzing(true);
    } else {
      alert('B/L과 INVOICE 파일을 모두 선택해주세요.');
    }
  };

  // 분석 진행 및 완료 후 페이지 이동 로직
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

  // 재사용 가능한 드롭존 UI를 위한 컴포넌트
  const FileDropZone = ({ type, title }: { type: FileType, title: string }) => {
    const file = selectedFiles[type];
    const ref = type === 'bl' ? blFileInputRef : invoiceFileInputRef;
    const dropZoneClass = `${styles.fileDropZone} ${dragging === type ? styles.dragging : ''}`;

    return (
      <div className={styles.dropZoneWrapper}>
        <h3 className={styles.dropZoneTitle}>{title}</h3>
        <div 
          className={dropZoneClass} 
          onClick={() => !file && handleTriggerFileInput(type)}
          onDragOver={handleDragOver} 
          onDragEnter={(e) => handleDragEnter(e, type)} 
          onDragLeave={handleDragLeave} 
          onDrop={(e) => handleDrop(e, type)}
        >
          <input type="file" ref={ref} onChange={(e) => handleFileSelect(e.target.files?.[0], type)} accept="image/*, application/pdf" style={{ display: "none" }} disabled={isAnalyzing} />
          {file ? (
            <div className={styles.selectedFileDisplay}>
              <span className={styles.fileName}>📄 {file.name}</span>
              <button onClick={(e) => handleClearFile(type, e)} className={styles.clearButton}>삭제</button>
            </div>
          ) : (
            <>
              <div className={styles.dropZoneIcon}>📁</div>
              <p className={styles.dropZoneText}>파일을 드래그하거나 클릭하여 선택</p>
            </>
          )}
          <div className={styles.dragOverlay}>여기에 파일을 드롭하세요!</div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadInfo}>
          <h1 className={styles.sectionTitle}>B/L & INVOICE 파일 업로드</h1>
          <p className={styles.infoDescription}>
            B/L과 INVOICE 파일을 각각 업로드하여 화물 정보를 추출하세요.<br />
            문서를 분석하여 주요 정보를 빠르고 정확하게 인식합니다.<br />
            이미지 파일(JPG, PNG) 또는 PDF 파일을 지원합니다.
          </p>
        </div>
        <div className={styles.uploadActionCard}>
          <div className={styles.dropZoneContainer}>
            <FileDropZone type="bl" title="B/L 파일" />
            <FileDropZone type="invoice" title="INVOICE 파일" />
          </div>
          
          <button 
            className={styles.analyzeButton} 
            onClick={handleAnalyzeClick} 
            disabled={!selectedFiles.bl || !selectedFiles.invoice || isAnalyzing}
          >
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