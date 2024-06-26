import { auth } from "@/utils/firebase";
import { validateEmail, validatePassword } from "@/utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./form.module.css";
import { saveAuthTokenToSession } from "@/utils/setToken";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    if (!loginInputs.email || !loginInputs.password) {
      setError("이메일 또는 비밀번호를 입력하세요.");
      return;
    }

    if (!validateEmail(loginInputs.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(loginInputs.password)) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    try {
      const { email, password } = loginInputs;
      await signInWithEmailAndPassword(auth, email, password);
      await saveAuthTokenToSession();
      setError("");
      router.push("/home");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "사용자가 존재하지 않습니다.";
          break;
        case "auth/invalid-credential":
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
          break;
        case "auth/too-many-requests":
          errorMessage = "잠시 후 다시 시도해 주세요.";
          break;

        default:
          errorMessage = "로그인에 실패했습니다.";
          break;
      }
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleLogIn} className={styles.form}>
      <input
        placeholder="이메일"
        type="email"
        id="email"
        name="email"
        value={loginInputs.email}
        onChange={handleInputChanges}
        required
      />

      <input
        placeholder="비밀번호"
        type="password"
        id="password"
        name="password"
        value={loginInputs.password}
        onChange={handleInputChanges}
        required
      />

      <div>{error && <p>{error}</p>}</div>
      <button type="submit">로그인</button>
      <span
        onClick={() => {
          router.push("/signup");
        }}
      >
        {"< 회원가입하러 가기"}
      </span>
    </form>
  );
}
