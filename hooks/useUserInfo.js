import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";

const UseUserInfo = (user) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.uid) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);
          } else {
            setUserData(null);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, [user]);

  return userData;
};

export default UseUserInfo;
