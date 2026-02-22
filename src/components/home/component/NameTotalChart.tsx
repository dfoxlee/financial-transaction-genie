import { useTransactionsStore } from "../../../stores/transactions.store";
import { Pie } from "react-chartjs-2";
import { useMemo, useState, type ChangeEvent } from "react";

import styles from "./NameTotalChart.module.css";

const chartOptions = {
   plugins: {
      legend: {
         position: "right" as const,
      },
   },
};

export default function NameTotalChart() {
   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );

   // states
   const [noOfNames, setNoOfNames] = useState(5);

   // memoized values
   const chartData = useMemo(() => {
      if (!currentTransactions || currentTransactions.length === 0) return null;

      const totalsByName = new Map<string, number>();

      currentTransactions.forEach((transaction) => {
         const name = transaction.description || "Unnamed";
         const currentTotal = totalsByName.get(name) ?? 0;

         totalsByName.set(
            name,
            Math.abs(currentTotal) + Math.abs(transaction.amount),
         );
      });

      const labels = [...totalsByName.keys()];
      const data = [...totalsByName.values()];

      return {
         labels,
         datasets: [
            {
               label: "Total Amount by Name",
               data,
               backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
               ],
               borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
               ],
               borderWidth: 1,
            },
         ],
      };
   }, [currentTransactions]);

   // handlers
   const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNoOfNames(Number(event.target.value));
   };

   if (!chartData) {
      return (
         <div className={styles.container}>
            <p>No transactions available to display.</p>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <div className={styles.rangeWrapper}>
            <h3
               className={styles.rangeAmount}
            >{`No. of Names: ${noOfNames}`}</h3>
            <input
               type="range"
               min={0}
               max={currentTransactions?.length}
               value={noOfNames}
               onChange={handleRangeChange}
               step={
                  currentTransactions?.length
                     ? currentTransactions.length / 10
                     : 1
               }
            />
         </div>
         <Pie data={chartData} options={chartOptions} />
      </div>
   );
}
