'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../AuthForm.module.css';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 로그인 로직 구현
    console.log('Login attempt:', { id, password });
    alert('로그인 시도');
  };

  return (
    <Layout>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>로그인</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">
            로그인
          </Button>
        </form>
        <p className={styles.linkPrompt}>
          계정이 없으신가요?{' '}
          <Link href="/signup">회원가입</Link>
        </p>
      </div>
    </Layout>
  );
}