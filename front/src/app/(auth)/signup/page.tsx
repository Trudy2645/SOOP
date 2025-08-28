'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../AuthForm.module.css';

export default function SignUpPage() {
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 회원가입 로직 구현
    console.log('Sign up attempt:', { phone, id, password });
    alert('회원가입 시도');
  };

  return (
    <Layout>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>회원가입</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="tel"
            placeholder="연락처를 입력하세요 ('-' 제외)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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
            가입하기
          </Button>
        </form>
        <p className={styles.linkPrompt}>
          이미 계정이 있으신가요?{' '}
          <Link href="/login">로그인</Link>
        </p>
      </div>
    </Layout>
  );
}