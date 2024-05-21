"use client";

import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import styles from "./profile.module.css";
import { usePathname, useRouter } from "next/navigation";

const UserProfile = () => {
  const { user } = useAuth();
  const userInfo = UseUserInfo(user);
  const router = useRouter();
  const pathName = usePathname();

  const maskPassword = (password) => {
    return "*".repeat(password.length);
  };

  return (
    <>
      {userInfo && (
        <div className={styles.info}>
          <p>안녕하세요, {userInfo.userName}님</p>

          <label>이메일</label>
          <input readOnly type="email" value={userInfo.userEmail} />

          <label>비밀번호</label>
          <input
            readOnly
            type="password"
            value={maskPassword(userInfo.userPassword)}
          />

          <label>생년월일</label>
          <input readOnly type="date" value={userInfo.dob} />

          <label>출석교회 이름</label>
          <input readOnly type="text" value={userInfo.church} />

          <button onClick={() => router.push(`${pathName}/mypray`)}>
            <p>나의 기도제목</p>
            <p>{">"}</p>
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
