"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import GoogleLoginButton from "@/components/auth/googleLogin";

export default function Main() {
  const router = useRouter();
  return (
    <>
      <main role="main" className={styles.box}>
        <button onClick={() => router.push("/login")}>로그인</button>
        <button onClick={() => router.push("/signup")}>회원가입</button>
        {/* <GoogleLoginButton /> */}
      </main>
    </>
  );
}
