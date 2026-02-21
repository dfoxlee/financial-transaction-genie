import type { CSSProperties } from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
   style?: CSSProperties;
}

export default function Loading({ style }: LoadingProps) {
   return (
      <div
         className={styles.container}
         style={style}
         role="status"
         aria-label="Loading"
      >
         <div className={styles.dot}></div>
         <div className={styles.dot}></div>
         <div className={styles.dot}></div>
      </div>
   );
}
