import { auth } from "@/utils/firebase";
import { validateEmail, validatePassword } from "@/utils/validate";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./form.module.css";
import { saveAuthTokenToSession } from "@/utils/setToken";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("이메일 인증이 완료되지 않았습니다. 이메일을 확인해 주세요.");
        setIsVerifyingEmail(true);
        return;
      }

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

  const handleResendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        alert("인증 이메일이 발송되었습니다. 이메일을 확인해 주세요.");
        setIsVerifyingEmail(false);
      } else {
        setError("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("인증 이메일 발송에 실패했습니다.");
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
      {isVerifyingEmail && (
        <button type="button" onClick={handleResendVerification}>
          인증 이메일 재전송
        </button>
      )}
      <span onClick={() => router.push("/reset-password")}>
        {"? 비밀번호 재설정"}
      </span>
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
