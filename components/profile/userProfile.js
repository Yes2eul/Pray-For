"use client";

import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import styles from "./profile.module.css";
import { usePathname, useRouter } from "next/navigation";
import LogoutBtn from "./logoutBtn";

const UserProfile = () => {
  const { user } = useAuth();
  const userInfo = UseUserInfo(user);
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = LogoutBtn();

  const maskPassword = (password) => {
    return "*".repeat(password.length);
  };

  return (
    <>
      {userInfo && (
        <div className={styles.info}>
          <h4>안녕하세요, {userInfo.userName}님</h4>

          <label>이메일</label>
          <input readOnly type="email" value={userInfo.userEmail} />

          <label>비밀번호</label>
          <input
            readOnly
            type="password"
            value={maskPassword(userInfo.userPassword)}
          />

          <label>생년월일</label>
          <input readOnly type="text" value={userInfo.dob} />

          <label>출석교회 이름</label>
          <input readOnly type="text" value={userInfo.church} />

          <button onClick={() => router.push(`${pathName}/mypray`)}>
            <p>나의 기도제목</p>
            <p>{">"}</p>
          </button>

          {/* <button onClick={() => router.push(`${pathName}/urpray`)}>
            <p>함께한 기도제목</p>
            <p>{">"}</p>
          </button> */}

          <div>
            <span onClick={handleLogout}>{"< 로그아웃"}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
