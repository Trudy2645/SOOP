// src/app/features/BLResultSection/CargoInfoPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast'; // Toaster 대신 toast를 import 합니다.
import styles from './CargoInfoTable.module.css';
import Button from '../../components/common/Button';
import buttonStyles from '../../components/common/Button.module.css';


// 1행의 제목 데이터는 고정이므로 컴포넌트 외부에 선언하여 재사용합니다.
const headerMap = {
  blNumber: "B/L 번호",
  hsCode: "HS CODE",
  standardItemName: "표준품명",
  tradingItemName: "거래품명",
  declarationNumber: "란 번호",
  lineNumber: "행 번호",
  spec1: "규격1",
  spec2: "규격2",
  spec3: "규격3",
  component: "성분",
  quantity: "수량",
  quantityUnit: "수량단위",
  unitPrice: "단가",
  amount: "금액",
  repetitiveImportRegNo: "반복수입거래 등록번호",
  partCode: "부품코드",
};

type CargoInfo = typeof initialCargoInfo;

const initialCargoInfo = {
  blNumber: "",
  hsCode: "",
  standardItemName: "",
  tradingItemName: "",
  declarationNumber: "",
  lineNumber: "",
  spec1: "",
  spec2: "",
  spec3: "",
  component: "",
  quantity: 0,
  quantityUnit: "",
  unitPrice: 0,
  amount: 0,
  repetitiveImportRegNo: "",
  partCode: "",
};


export default function CargoInfoPage() {
  const [cargoInfo, setCargoInfo] = useState<CargoInfo | null>(null);

  useEffect(() => {
    const fetchCargoData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      const dummyData = {
        blNumber: "MGI12566036",
        hsCode: "8541.40.1000",
        standardItemName: "광다이오드",
        tradingItemName: "LED CHIP",
        declarationNumber: "123456789",
        lineNumber: "001",
        spec1: "MODEL: A1-CHIP, 3W",
        spec2: "SIZE: 3.5*2.8mm",
        spec3: "VOLT: 3.2V",
        component: "Ga, N, In",
        quantity: 50000,
        quantityUnit: "EA",
        unitPrice: 0.08,
        amount: 4000,
        repetitiveImportRegNo: "R-1234-5678",
        partCode: "P-LED-A1-CHIP",
      };

      setCargoInfo(dummyData);
    };

    fetchCargoData();
  }, []);

  const handleExcelDownloadClick = () => {
    if (!cargoInfo) {
      toast.error('데이터가 아직 로딩되지 않았습니다.');
      return;
    }

    const koreanHeaders = Object.keys(cargoInfo).map(key => headerMap[key as keyof typeof headerMap]);
    const valuesAsText = Object.values(cargoInfo).map(value => String(value));
    const data = [koreanHeaders, valuesAsText];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    const colWidths = valuesAsText.map((text, i) => {
      const headerLength = koreanHeaders[i].length;
      const textLength = text.length;
      return { wch: Math.max(headerLength, textLength) + 5 };
    });
    ws['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(wb, ws, "CargoInfo");
    XLSX.writeFile(wb, "cargo_info.xlsx");
  };

  // 2. '복사하기' 버튼 핸들러 수정
  const handleCopyClick = () => {
    if (!cargoInfo) {
      toast.error('복사할 데이터가 없습니다.');
      return;
    }

    // 복사할 텍스트를 "제목: 값" 형태로 만듭니다.
    const textToCopy = Object.keys(cargoInfo)
      .map(key => {
        const label = headerMap[key as keyof typeof headerMap];
        const value = cargoInfo[key as keyof typeof cargoInfo];
        return `${label}: ${value}`;
      })
      .join('\n'); // 각 항목을 줄바꿈으로 구분

    // 클립보드에 텍스트를 복사합니다.
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // 성공 시 토스트 메시지를 띄웁니다.
        toast.success('화물 정보가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        // 실패 시 에러 메시지를 띄웁니다.
        toast.error('복사에 실패했습니다.');
        console.error('Copy failed:', err);
      });
  };
  
  // ... (이하 코드는 이전과 동일) ...
  if (!cargoInfo) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.loadingContainer}>데이터를 불러오는 중입니다...</div>
        </div>
    );
  }

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
          <div className={styles.infoSection}>
            <table className={styles.infoTable}>
              <tbody>
                {
                  Object.keys(cargoInfo).filter((_, index) => index % 2 === 0).map((key, index) => {
                    const key1 = Object.keys(cargoInfo)[index * 2];
                    const key2 = Object.keys(cargoInfo)[index * 2 + 1];

                    return (
                      <tr key={key1}>
                        <td className={styles.infoLabelCell}>{headerMap[key1 as keyof typeof headerMap]}</td>
                        <td className={styles.infoValueCell}>{cargoInfo[key1 as keyof typeof cargoInfo]}</td>
                        {key2 ? (
                          <>
                            <td className={styles.infoLabelCell}>{headerMap[key2 as keyof typeof headerMap]}</td>
                            <td className={styles.infoValueCell}>{cargoInfo[key2 as keyof typeof cargoInfo]}</td>
                          </>
                        ) : (
                          <>
                            <td className={styles.infoLabelCell}></td>
                            <td className={styles.infoValueCell}></td>
                          </>
                        )}
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
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
