import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';
import "../globals.css";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}