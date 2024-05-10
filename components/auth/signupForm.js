import { auth, db } from "@/utils/firebase";
import { validateEmail, validatePassword } from "@/utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
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
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!signupInputs.email || !signupInputs.password) {
      setError("이메일 또는 비밀번호를 입력하세요.");
      return;
    }

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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupInputs.email,
        signupInputs.password
      );

      const userId = userCredential.user.uid;

      await addDoc(collection(db, "users"), {
        userId: userId,
        userEmail: signupInputs.email,
        userPassword: signupInputs.password,
        userName: signupInputs.userName,
        dob: signupInputs.dob,
        church: signupInputs.church,
      });

      setError("");
      router.push("/login");
    } catch (error) {
      setError(error.message);
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
        type="date"
        id="dob"
        name="dob"
        value={signupInputs.dob}
        onChange={handleInputChange}
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

      <div>{error && <p>{error}</p>}</div>
      <button type="submit">회원가입</button>
    </form>
  );
}
