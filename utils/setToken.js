import { auth } from "@/utils/firebase";

// 사용자의 토큰 값을 세션 스토리지에 저장
export const saveAuthTokenToSession = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      const expirationTime = new Date(Date.now() + 30 * 60 * 1000).getTime();
      const tokenData = { token, expirationTime };
      sessionStorage.setItem("authToken", JSON.stringify(tokenData));

      setTimeout(() => {
        removeAuthTokenFromSession();
        window.location.href = "/login";
      }, 30 * 60 * 1000);
    }
  } catch (error) {
    console.error(error);
  }
};

// 토큰 값 제거
export const removeAuthTokenFromSession = () => {
  sessionStorage.removeItem("authToken");
};
