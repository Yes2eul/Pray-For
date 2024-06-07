"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import UseUserInfo from "@/hooks/useUserInfo";
import styles from "./profile.module.css";
import { usePathname, useRouter } from "next/navigation";

const UserProfile = () => {
  const { user } = useAuth();
  const userInfo = UseUserInfo(user);
  const router = useRouter();
  const pathName = usePathname();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {userInfo && (
        <div className={styles.info}>
          <div className={styles.nameBox}>
            <span className={styles.hello}>안녕하세요, </span>
            <span className={styles.customName}>{userInfo.userName}</span>
            <span className={styles.hello}>님</span>
          </div>

          <label>이메일</label>
          <input readOnly type="email" value={userInfo.userEmail} />

          <label>비밀번호</label>
          <div className={styles.passwordContainer}>
            <input
              readOnly
              type={showPassword ? "text" : "password"}
              value={showPassword ? userInfo.userPassword : "********"}
            />
            <img
              src={showPassword ? "/pw_hide.png" : "/pw_show.png"}
              alt={showPassword ? "Hide" : "Show"}
              onClick={togglePasswordVisibility}
              width={20}
              height={20}
              className={styles.passwordToggle}
            />
          </div>

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
        </div>
      )}
    </>
  );
};

export default UserProfile;
