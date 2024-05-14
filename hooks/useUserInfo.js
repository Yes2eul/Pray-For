import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const useUserInfo = (uid) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async (uid) => {
      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          // 사용자 정보가 존재하지 않을 때 처리할 내용 추가 가능
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (uid) {
      fetchUserInfo(uid);
    }
  }, [uid]);

  return user;
};

export default useUserInfo;
