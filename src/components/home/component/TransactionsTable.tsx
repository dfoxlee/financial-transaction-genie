import { useMemo, useState } from "react";
import { useTransactionsStore } from "../../../stores/transactions.store";
import CurrencyInput from "../../shared/CurrencyInput";
import DateInput from "../../shared/DateInput";
import TextInput from "../../shared/TextInput";

import styles from "./TransactionsTable.module.css";
import StandardBtn from "../../shared/StandardBtn";
import { FaTrash } from "react-icons/fa";
import CategoryAutoComplete from "../../shared/CategoryAutoComplete";

export default function TransactionsTable() {
   // states
   const [searchValue, setSearchValue] = useState("");

   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );
   const updateCurrentTransaction = useTransactionsStore(
      (state) => state.updateCurrentTransaction,
   );
   const deleteCurrentTransaction = useTransactionsStore(
      (state) => state.deleteCurrentTransaction,
   );
   const initialTransactions = useTransactionsStore(
      (state) => state.initialTransactions,
   );
   const setCurrentTransactions = useTransactionsStore(
      (state) => state.setCurrentTransactions,
   );

   // memoized values
   const totalAmount = useMemo(() => {
      if (!currentTransactions || currentTransactions.length === 0) return 0;

      return currentTransactions.reduce((total, transaction) => {
         return total + transaction.amount;
      }, 0);
   }, [currentTransactions]);

   // handlers
   const handleDateChange = (id: number, date: string) => {
      const currentTransaction = currentTransactions?.find((t) => t.id === id);

      if (currentTransaction) {
         updateCurrentTransaction({
            ...currentTransaction,
            transactionDate: new Date(date),
         });
      }
   };

   const handleNameChange = (id: number, name: string) => {
      const currentTransaction = currentTransactions?.find((t) => t.id === id);

      if (currentTransaction) {
         updateCurrentTransaction({ ...currentTransaction, name });
      }
   };

   const handleDescriptionChange = (id: number, description: string) => {
      const currentTransaction = currentTransactions?.find((t) => t.id === id);

      if (currentTransaction) {
         updateCurrentTransaction({ ...currentTransaction, description });
      }
   };

   const handleAmountChange = (id: number, amount: number) => {
      const currentTransaction = currentTransactions?.find((t) => t.id === id);

      if (currentTransaction) {
         updateCurrentTransaction({ ...currentTransaction, amount });
      }
   };

   const handleSearchChange = (value: string) => {
      setSearchValue(value);

      if (!value.trim()) {
         setCurrentTransactions(initialTransactions);
         return;
      }

      const lowercasedValue = value.toLowerCase();

      const filteredTransactions = initialTransactions?.filter(
         (transaction) => {
            return (
               transaction.name.toLowerCase().includes(lowercasedValue) ||
               transaction.description
                  .toLowerCase()
                  .includes(lowercasedValue) ||
               transaction.category.toLowerCase().includes(lowercasedValue)
            );
         },
      );

      setCurrentTransactions(filteredTransactions ?? []);
   };

   const handleDeleteTransaction = (id: number) => {
      deleteCurrentTransaction(id);
   };

   const handleCategoryChange = (id: number, category: string) => {
      const currentTransaction = currentTransactions?.find((t) => t.id === id);

      if (currentTransaction) {
         updateCurrentTransaction({ ...currentTransaction, category });
      }
   };

   return (
      <div className={styles.container}>
         <table className={styles.table}>
            <thead>
               <tr>
                  <th className={styles.tableToolbarHeader} colSpan={6}>
                     <div className={styles.toolbarWrapper}>
                        <TextInput
                           style={{
                              maxWidth: "400px",
                           }}
                           value={searchValue}
                           onChange={handleSearchChange}
                           placeholder="Search transactions and descriptions"
                        />
                        <h3>{`Total: $${totalAmount.toFixed(2)}`}</h3>
                     </div>
                  </th>
               </tr>
               <tr>
                  <th className={styles.tableHeader}>Delete</th>
                  <th className={styles.tableHeader}>Date</th>
                  <th className={styles.tableHeader}>Name</th>
                  <th className={styles.tableHeader}>Description</th>
                  <th className={styles.tableHeader}>Category</th>
                  <th className={styles.tableHeader}>Amount</th>
               </tr>
            </thead>
            <tbody>
               {currentTransactions?.map((transaction) => (
                  <tr className={styles.tableRow} key={transaction.id}>
                     <td className={styles.tableData}>
                        <StandardBtn
                           style={{ margin: "0 auto" }}
                           LeftIcon={FaTrash}
                           theme="danger"
                           onClick={() =>
                              handleDeleteTransaction(transaction!.id!)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <DateInput
                           value={transaction.transactionDate}
                           onChange={(value) =>
                              handleDateChange(transaction!.id!, value)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <TextInput
                           value={transaction.name}
                           onChange={(value) =>
                              handleNameChange(transaction!.id!, value)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <TextInput
                           value={transaction.description}
                           onChange={(value) =>
                              handleDescriptionChange(transaction!.id!, value)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <CategoryAutoComplete
                           value={transaction.category}
                           onChange={(value) =>
                              handleCategoryChange(transaction!.id!, value)
                           }
                        />
                     </td>
                     <td className={styles.tableData}>
                        <CurrencyInput
                           value={transaction.amount}
                           onChange={(value) =>
                              handleAmountChange(transaction!.id!, value)
                           }
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
