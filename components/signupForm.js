"use client";

import { validateEmail, validatePassword } from "@/utils/validate";
import { useState } from "react";

export default function SignUpForm({ handleSignUp, error }) {
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(signupInputs.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(signupInputs.password)) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (signupInputs.password !== signupInputs.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    handleSignUp(signupInputs);
  };

  return (
    <form onSubmit={handleSignUpSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={signupInputs.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={signupInputs.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={signupInputs.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">회원가입</button>
      {error && <p>{error}</p>}
    </form>
  );
}
