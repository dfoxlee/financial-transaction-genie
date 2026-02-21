import TransactionsTable from "./component/TransactionsTable";

import styles from "./Home.module.css";

export default function Home() {
   return (
      <div className={styles.container}>
         <TransactionsTable />
      </div>
   );
}
