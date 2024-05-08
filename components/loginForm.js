import { validateEmail, validatePassword } from "@/utils/validate";
import React, { useState } from "react";

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
    <form onSubmit={handleLogInSubmit} id="form">
      <input
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={loginInputs.email}
        onChange={handleInputChanges}
        required
      />

      <input
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        value={loginInputs.password}
        onChange={handleInputChanges}
        required
      />

      {error && <p>{error}</p>}
      <button type="submit">로그인</button>
    </form>
  );
}
