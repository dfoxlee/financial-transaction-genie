// import Loading from "../shared/Loading";
import TransactionsDropzone from "./component/TransactionsDropzone";

import styles from "./Instructions.module.css";

export default function Instructions() {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>
               Welcome to the Financial Transaction Genie
            </h1>
            <p className={styles.introText}>
               In a world of connectedness, we believe that reviewing your
               financial transactions should be on your terms. We put the power
               in your hands, meaning NONE of your data ever leaves your device.
               Once you download the template you are free to use the
               application offline to ensure your privacy.
            </p>
            <TransactionsDropzone />
            <h3 className={styles.gettingStarted}>Getting Started</h3>
            <ol className={styles.startingWrapper}>
               <li className={styles.startingItem}>
                  Download the transaction template to your device.
               </li>
               <li className={styles.startingItem}>
                  At this point you can start using the application offline.
               </li>
               <li className={styles.startingItem}>
                  Fill in your financial transactions in the template.
               </li>
               <li className={styles.startingItem}>
                  Upload the completed template to the Financial Transaction
                  Genie.
               </li>
               <li className={styles.startingItem}>
                  Review your transactions securely and privately.
               </li>
            </ol>
         </div>
      </div>
   );
}
