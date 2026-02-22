import { FaMaximize, FaMinimize } from "react-icons/fa6";
import StandardBtn from "../../shared/StandardBtn";
import { FaTimes } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useTransactionsStore } from "../../../stores/transactions.store";

import styles from "./AssignCategoriesModal.module.css";
import CategoryAutoComplete from "../../shared/CategoryAutoComplete";

interface AssignCategoriesModalProps {
   onClose: () => void;
}

export default function AssignCategoriesModal({
   onClose,
}: AssignCategoriesModalProps) {
   // stores
   const initialTransactions = useTransactionsStore(
      (state) => state.initialTransactions,
   );
   // states
   const [isMaximized, setIsMaximized] = useState(false);

   // memoized values
   const uniqueNames = useMemo(() => {
      const names: string[] = [];

      if (!initialTransactions) return names;

      for (const transaction of initialTransactions) {
         if (!names.includes(transaction.name)) {
            names.push(transaction.name);
         }
      }

      return names;
   }, [initialTransactions]);

   // functions
   const toggleMaximize = () => {
      setIsMaximized((prev) => !prev);
   };

   // handlers
   const handleCategoryChange = (name: string, category: string) => {
      console.log(`Name: ${name}, Category: ${category}`);
      // Here you can implement the logic to update the category for the given name
   };

   return (
      <div className={styles.container}>
         <div
            className={
               isMaximized
                  ? `${styles.wrapper} ${styles.maxWrapper}`
                  : styles.wrapper
            }
         >
            <div className={styles.header}>
               <h2>Assign Categories</h2>
               <div className={styles.modalOptionsWrapper}>
                  <StandardBtn
                     LeftIcon={isMaximized ? FaMinimize : FaMaximize}
                     onClick={toggleMaximize}
                  />
                  <StandardBtn LeftIcon={FaTimes} onClick={onClose} />
               </div>
            </div>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th className={styles.tableHeader}>Name</th>
                     <th className={styles.tableHeader}>Category</th>
                  </tr>
               </thead>
               <tbody>
                  {uniqueNames.map((name) => (
                     <tr key={name}>
                        <td className={styles.tableData}>{name}</td>
                        <td className={styles.tableData}>
                           <CategoryAutoComplete
                              value={name}
                              onChange={(category) =>
                                 handleCategoryChange(name, category)
                              }
                           />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
