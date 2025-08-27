"use client";

import React from "react";
import * as XLSX from "xlsx";

const Page = () => {
  const fileName = "수입통관데이터";

  // 데이터 = [ {컬럼명: 값} ]
  const data = [
    {
      운송주선인코드: "XXXX",
      운송주선인상호: "PT KAYAN WOOD INDUSTRIES",
      무역거래처부호: "IDPTKAYA0007W",
      무역거래처상호: "PT KAYAN WOOD INDUSTRIES",
      무역거래처국가코드: "ID",
      해외공급자부호: "IDPTKAYA0007W",
      해외공급자국가: "ID",
      해외공급자상호: "PT KAYAN WOOD INDUSTRIES",
      통관계획: "F",
      신고일자: "20250609",
      거래구분: "11",
      수입종류: "21",
      원산지증명유무: "Y",
      가격신고서유무: "Y",
      결제방법: "TT",
      입항일자: "20250608",
      도착항코드: "KRBNP",
      도착항항구명: "부산신항",
      도착항항구공항구분: "항구",
      선기명: "MSC SPARKLE III",
      MasterB_L번호: "MEDUXJ350081",
      운송형태: "CY",
      선기명_1: "MSC SPARKLE",
      운송용기: "10",
      적출국코드: "ID",
      적출국가명: "INDNSIA",
      B_L번호: "MEDUXJ350081",
      B_L구분: "N",
      반입일자: "20250609",
      장치장부호: "03077013",
      장치장명: "부산신항국제터미널(주)",
      장치장소: "250216679A",
      장치장과: "C1",
      화물관리번호: "25MSCU5145I0002",
      총란수: 1,
      인도조건: "CFR",
      결제통화단위: "USD",
      입력결제금액: 17982,
      USD환율: 1375.47,
      결제통화단위환율: 1375.47,
      보험료분할여부: "N",
      총포장수량: 2430,
      포장수량단위: "GT",
      총중량: 24800,
      중량단위: "KG",
      란결제금액합계: 17982,
      감정가: 24733701,
      Cif원화: 24733701,
      Cif달러: 17982,
      // ... (이하 나머지 컬럼도 같은 방식으로 쭉 채우면 됨)
      표준품명: "AGGLOMERATED WOOD CHARCOAL",
      거래품명: "AGGLOMERATED WOOD CHARCOAL",
      수량: 740,
      수량단위: "17982",
      원산지코드: "ID",
      원산지이름: "INDNSIA",
      표준품명코드: "4402901019",
      세율설명: "세가",
      긴급관세구분: "A",
    },
  ];

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleDownload}
        className="rounded-xl bg-blue-500 px-6 py-3 text-white shadow hover:bg-blue-600"
      >
        엑셀 저장
      </button>
    </main>
  );
};

export default Page;