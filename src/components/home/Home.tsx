import TransactionsTable from "./component/TransactionsTable";
import TransactionsOverTimeChart from "./component/TransactionsOverTimeChart";
import CategoryTotalChart from "./component/CategoryTotalChart";

import styles from "./Home.module.css";
import { useState } from "react";
import AssignCategoriesModal from "./component/AssignCategoriesModal";
import NameTotalChart from "./component/NameTotalChart";

export default function Home() {
   // states
   const [isAssignCategoriesModalOpen, setIsAssignCategoriesModalOpen] =
      useState(false);

   const openAssignCategoriesModal = () => {
      setIsAssignCategoriesModalOpen(true);
   };

   const closeAssignCategoriesModal = () => {
      setIsAssignCategoriesModalOpen(false);
   };

   return (
      <div className={styles.container}>
         {isAssignCategoriesModalOpen && (
            <AssignCategoriesModal onClose={closeAssignCategoriesModal} />
         )}
         <CategoryTotalChart />
         <NameTotalChart />
         <TransactionsOverTimeChart />
         <TransactionsTable
            openAssignCategoriesModal={openAssignCategoriesModal}
         />
      </div>
   );
}
