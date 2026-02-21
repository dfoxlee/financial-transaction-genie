import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { parseTransactions } from "../../../utils/parseTransactions";

import styles from "./TransactionsDropzone.module.css";
import { useTransactionsStore } from "../../../stores/transactions.store";

export default function TransactionsDropzone() {
   // stores
   const setInitialTransactions = useTransactionsStore(
      (state) => state.setInitialTransactions,
   );

   // functions
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         const file = acceptedFiles[0];

         if (!file) return toast.warning("No file uploaded. Please try again.");

         Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
               const { validTransactions, errors } = parseTransactions(
                  results.data,
               );

               if (validTransactions.length === 0) {
                  toast.error(
                     "No valid transactions found. Please check your CSV values and try again.",
                  );

                  return;
               }

               setInitialTransactions(validTransactions);

               toast.success(
                  `Successfully uploaded ${validTransactions.length} transactions!`,
               );

               if (errors.length > 0) {
                  toast.warning(
                     `${errors.length} transaction row(s) were skipped due to validation errors.`,
                  );

                  console.warn("Invalid transaction rows:", errors);
               }
            },
            error: (error) => {
               console.error("Error parsing CSV file:", error);

               toast.error(
                  "Error parsing CSV file. Please ensure the file is valid and try again.",
               );
            },
         });
      },
      [setInitialTransactions],
   );

   // hooks
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <div
         className={
            isDragActive
               ? `${styles.container} ${styles.containerActive}`
               : styles.container
         }
         {...getRootProps()}
      >
         <input {...getInputProps()} />
         <p
            className={
               isDragActive
                  ? `${styles.instructions} ${styles.instructionsActive}`
                  : styles.instructions
            }
         >
            {isDragActive
               ? "Drop your files "
               : "Drop your completed transaction template here. Or click to select files from your device."}
         </p>
      </div>
   );
}
