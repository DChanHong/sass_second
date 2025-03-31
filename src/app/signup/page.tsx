"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleEmailVerification = async () => {
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      setVerificationSent(true);
      setError(null);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.");
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: "signup",
      });

      if (error) throw error;
      setIsEmailVerified(true);
      setError(null);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      router.push("/login?message=회원가입이 완료되었습니다. 로그인해주세요.");
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative z-10 border border-emerald-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">회원가입</h1>
            <p className="text-emerald-700">새로운 계정을 만들어보세요</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
                  placeholder="이메일을 입력해주세요"
                  disabled={isEmailVerified}
                />
                <button
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={isEmailVerified || verificationSent}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer whitespace-nowrap"
                >
                  {verificationSent ? "인증메일 발송됨" : "인증하기"}
                </button>
              </div>
            </div>

            {verificationSent && !isEmailVerified && (
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                  인증 코드
                </label>
                <div className="flex gap-2">
                  <input
                    id="verificationCode"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
                    placeholder="인증 코드를 입력해주세요"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 hover:cursor-pointer whitespace-nowrap"
                  >
                    확인
                  </button>
                </div>
              </div>
            )}

            {isEmailVerified && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호 확인
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
                    placeholder="비밀번호를 다시 입력해주세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer"
                >
                  {loading ? "처리중..." : "회원가입"}
                </button>
              </>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-emerald-500 hover:text-emerald-600 font-medium hover:cursor-pointer">
                  로그인하러 가기
                </Link>
              </p>
            </div>
          </form>

          {!isEmailVerified && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 hover:cursor-pointer"
                  onClick={() => supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${location.origin}/auth/callback`
                    }
                  })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google로 회원가입
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 hover:cursor-pointer"
                  onClick={() => supabase.auth.signInWithOAuth({
                    provider: "kakao",
                    options: {
                      redirectTo: `${location.origin}/auth/callback`
                    }
                  })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#FEE500">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    />
                  </svg>
                  카카오로 회원가입
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 