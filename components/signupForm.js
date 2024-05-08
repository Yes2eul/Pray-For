import { validateEmail, validatePassword } from "@/utils/validate";
import React, { useState } from "react";

export default function SignUpForm({ handleSignUp, error }) {
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    dob: "",
    church: "",
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

    if (signupInputs.userName.length > 2) {
      setError("이름은 최소 2자 이상이어야 합니다.");
    }

    if (signupInputs.church.length > 2) {
      setError("출석교회명은 최소 2자 이상이어야 합니다.");
    }

    setError("");
    handleSignUp(signupInputs);
  };

  return (
    <form onSubmit={handleSignUpSubmit} id="form">
      <input
        placeholder="이메일"
        type="email"
        id="email"
        name="email"
        value={signupInputs.email}
        onChange={handleInputChange}
        required
      />

      <input
        placeholder="비밀번호"
        type="password"
        id="password"
        name="password"
        value={signupInputs.password}
        onChange={handleInputChange}
        required
      />

      <input
        placeholder="비밀번호 확인"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={signupInputs.confirmPassword}
        onChange={handleInputChange}
        required
      />

      <input
        placeholder="이름"
        type="text"
        id="userName"
        name="userName"
        value={signupInputs.userName}
        onChange={handleInputChange}
        required
      />

      <input
        placeholder="생년월일 (yymmdd)"
        type="number"
        id="dob"
        name="dob"
        value={signupInputs.dob}
        onChange={handleInputChange}
        pattern="\d{6}"
        required
      />

      <input
        placeholder="출석교회 (*없으면 없음)"
        type="text"
        id="church"
        name="church"
        value={signupInputs.church}
        onChange={handleInputChange}
        required
      />

      {error && <p>{error}</p>}
      <button type="submit">회원가입</button>
    </form>
  );
}
