import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { removeAuthTokenFromSession } from "@/utils/setToken";

const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      removeAuthTokenFromSession();
      alert("로그아웃 되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return handleLogout;
};

export default LogoutBtn;
