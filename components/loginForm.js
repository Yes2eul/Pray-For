import { auth } from "@/utils/firebase";
import { validateEmail, validatePassword } from "@/utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
      setError("");
      router.push("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogIn} id="form">
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
    </form>
  );
}
