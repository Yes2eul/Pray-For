import { auth, db } from "@/utils/firebase";
import {
  validateChurch,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./form.module.css";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    dob: "",
    church: "",
  });
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "dob" && value.length <= 10) {
      const formattedValue = value
        .replace(/\D/g, "") // 숫자만 허용
        .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"); // yyyy-mm-dd 형식으로 변환
      setSignupInputs({ ...signupInputs, [name]: formattedValue });
    } else {
      setSignupInputs({ ...signupInputs, [name]: value });
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!signupInputs.email || !signupInputs.password) {
      return setError("이메일 또는 비밀번호를 입력하세요.");
    }
    if (!validateEmail(signupInputs.email)) {
      return setError("올바른 이메일 형식이 아닙니다.");
    }
    if (!validatePassword(signupInputs.password)) {
      return setError("비밀번호는 최소 8자 이상이어야 합니다.");
    }
    if (signupInputs.password !== signupInputs.confirmPassword) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    if (!validateName(signupInputs.userName)) {
      return setError("이름은 한글 2글자 이상이어야 합니다.");
    }
    if (!validateDate(signupInputs.dob)) {
      return setError("유효한 날짜를 입력해주세요.");
    }
    if (!validateChurch(signupInputs.church)) {
      return setError("출석교회 이름은 한글 2글자 이상이어야 합니다.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupInputs.email,
        signupInputs.password
      );

      const newUser = {
        uid: userCredential.user.uid,
        userEmail: signupInputs.email,
        userPassword: signupInputs.password,
        userName: signupInputs.userName,
        dob: signupInputs.dob,
        church: signupInputs.church,
        posts: [],
      };

      await setDoc(doc(db, "users", newUser.uid), newUser);

      setError("");
      router.push("/login");
    } catch (error) {
      let errorMessage = "signup-error";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "이미 사용 중인 이메일 주소입니다.";
          break;

        default:
          break;
      }
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSignUp} className={styles.form}>
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
        placeholder="생년월일 (yyyy-mm-dd)"
        type="text"
        id="dob"
        name="dob"
        value={signupInputs.dob}
        onChange={handleInputChange}
        maxLength="10"
        required
      />

      <input
        placeholder="출석교회 이름(*없으면 없음)"
        type="text"
        id="church"
        name="church"
        value={signupInputs.church}
        onChange={handleInputChange}
        required
      />

      <div>{error && <p>{error}</p>}</div>
      <button type="submit">회원가입</button>
      <span
        onClick={() => {
          router.push("/login");
        }}
      >
        {"< 로그인하러 가기"}
      </span>
    </form>
  );
}
