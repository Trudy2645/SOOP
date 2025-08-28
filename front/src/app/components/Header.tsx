import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // next/image 컴포넌트를 import 합니다.
import styles from './Header.module.css';
import LogoImage from '../../../public/logo.svg'; // 로고 SVG 파일을 import 합니다.

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/features/FileUpload" className={styles.logoLink}>
          <div className={styles.logoContainer}>
            {/* 기존 logoCircle과 companyName 대신 Image 컴포넌트 사용 */}
            <Image
              src={LogoImage} // 임포트한 SVG 파일
              alt="SOOP INTERNATIONAL CO.,LTD Logo" // 스크린리더를 위한 alt 텍스트
              width={142} // 이미지의 너비
              height={33} // 이미지의 높이
              className={styles.actualLogo} // CSS 스타일을 적용하기 위한 클래스
              priority // LCP(Largest Contentful Paint) 개선을 위해 가장 먼저 로드
            />
          </div>
        </Link>
        <nav className={styles.authLinks}>
          <Link href="/login">로그인</Link> / <Link href="/signup">회원가입</Link>
        </nav>
      </div>
    </header>
  );
}