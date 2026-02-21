import genieImg from "/genie.png";
import StandardBtn from "../shared/StandardBtn";
import { FaDownload } from "react-icons/fa";

import styles from "./header.module.css";

export default function Header() {
   // handlers
   const handleDownloadTemplateClick = () => {
      const link = document.createElement("a");
      link.href = "/transaction-template.csv";
      link.download = "transaction-template.csv";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.titleImgWrapper}>
               <img className={styles.titleImg} src={genieImg} alt="Genie" />
               <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Financial</h1>
                  <h1 className={styles.title}>Transaction</h1>
                  <h1 className={styles.title}>Genie</h1>
               </div>
            </div>
            <StandardBtn
               LeftIcon={FaDownload}
               text="Transaction Template"
               outlined
               onClick={handleDownloadTemplateClick}
            />
         </div>
      </div>
   );
}
