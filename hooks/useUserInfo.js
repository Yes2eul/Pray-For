import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebase";

const UseUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkStatus = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        fetchUserInfo(uid);
      } else {
        setUser(null);
      }
    });

    return () => checkStatus();
  }, []);

  const fetchUserInfo = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
        console.log(userSnap.data());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return user;
};

export default UseUserInfo;
