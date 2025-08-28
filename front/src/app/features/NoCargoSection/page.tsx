'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // useRouter를 import 합니다.
import styles from './NoCargoSection.module.css';
import Button from '../../components/common/Button';
import buttonStyles from '../../components/common/Button.module.css';
import Layout from '../../components/Layout'; // Layout을 import 합니다.

export default function BLResultPage() {
  const router = useRouter(); // router를 초기화합니다.
  const blNumber = "MGI12566036";

  // '홈으로 돌아가기' 버튼 클릭 시 파일 업로드 페이지로 이동합니다.
  const handleGoHomeClick = () => {
    router.push('/features/FileUpload');
  };

  const handleLoadInfoClick = () => {
    alert('BL 번호 직접 입력 버튼이 클릭되었습니다.');
    // TODO: BL 번호 직접 입력 페이지로 이동하는 로직 구현
  };

  return (
    <Layout>
      <div className={styles.resultContainer}>
        <h2 className={styles.sectionTitle}>화물정보가 존재하지 않습니다</h2>
        <div className={styles.buttonGroup}>
          <Button onClick={handleGoHomeClick} className={styles.copyButton}>
            홈으로 돌아가기
          </Button>
          <Button onClick={handleLoadInfoClick} className={buttonStyles.button}>
            BL 번호 직접 입력
          </Button>
        </div>
      </div>
    </Layout>
  );
}