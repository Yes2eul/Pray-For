import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p>&copy; 2024. All Rights Reserved.</p>
      </div>
      <div className={styles.contact}>
        <p>
          Contact:
          <a href="https://forms.gle/AoCVcnsn7zc2LrSD6">
            {" forms.gle/AoCVcnsn7zc2LrSD6"}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
