import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

const GoogleLoginButton = () => {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (user) {
        router.push("/home");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleGoogleLogin}>구글 로그인</button>;
};

export default GoogleLoginButton;
