"use client";

import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  return (
    <>
      <main role="main" id="main">
        <button onClick={() => router.push("/login")}>로그인</button>
        <button onClick={() => router.push("/signup")}>회원가입</button>
        <button>구글 로그인</button>
      </main>
    </>
  );
}
