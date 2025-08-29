'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from '../AuthForm.module.css';

export default function SignupPage() {
  // 1. State 변경: id -> email, passwordConfirm, errors 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const validateForm = () => {
    const newErrors = { email: '', password: '', passwordConfirm: '' };
    let isValid = true;

    // 2. 이메일 유효성 검사 (@ 포함)
    if (!email.includes('@')) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    }
    
    // 3. 비밀번호 유효성 검사 (영문자+숫자 포함)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = '비밀번호는 영문자와 숫자를 포함해야 합니다.';
      isValid = false;
    }

    // 4. 비밀번호 확인 (일치 여부)
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // 모든 유효성 검사 통과 시
      console.log('Signup attempt:', { email, password });
      alert('회원가입 시도');
      // TODO: 실제 회원가입 API 호출 로직 구현
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <Layout>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>회원가입</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Input
              type="email" // type을 "email"로 변경
              placeholder="이메일 주소를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* 이메일 에러 메시지 표시 */}
            <div className={styles.errorWrapper}>
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
          </div>
          <div>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요 (영문+숫자)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* 비밀번호 에러 메시지 표시 */}
            <div className={styles.errorWrapper}>
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>
          </div>
          <div>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            {/* 비밀번호 확인 에러 메시지 표시 */}
            <div className={styles.errorWrapper}>
              {errors.passwordConfirm && <p className={styles.errorMessage}>{errors.passwordConfirm}</p>}
            </div>
          </div>
          <Button type="submit">
            회원가입
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