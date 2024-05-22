import React from "react";
import { useRouter } from "next/navigation";
import styles from "./userPost.module.css";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.backButton}>
      <p>{"<"}</p>
    </button>
  );
};

export default BackButton;
