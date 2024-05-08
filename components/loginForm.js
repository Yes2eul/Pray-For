"use client";

import { validateEmail, validatePassword } from "@/utils/validate";
import { useState } from "react";

export default function LoginForm({ handleLogin, error }) {
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(loginInputs.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(loginInputs.password)) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    setError("");
    handleLogin(loginInputs);
  };

  return (
    <form onSubmit={handleLogInSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginInputs.email}
          onChange={handleInputChanges}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginInputs.password}
          onChange={handleInputChanges}
          required
        />
      </div>
      <button type="submit">로그인</button>
      {error && <p>{error}</p>}
    </form>
  );
}
