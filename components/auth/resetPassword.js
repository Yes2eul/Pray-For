import { auth } from "@/utils/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./form.module.css";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("이메일을 입력하세요.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해 주세요.");
      setError("");
      router.push("/login");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "유효하지 않은 이메일 주소입니다.";
          break;
        case "auth/user-not-found":
          errorMessage = "사용자 정보를 찾을 수 없습니다.";
          break;
        default:
          errorMessage = "비밀번호 재설정 이메일 발송에 실패했습니다.";
          break;
      }
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className={styles.form}>
      <input
        placeholder="이메일"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <div>{error && <p>{error}</p>}</div>
      <button type="submit">비밀번호 재설정</button>
    </form>
  );
}
