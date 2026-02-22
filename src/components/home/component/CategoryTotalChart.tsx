import { useTransactionsStore } from "../../../stores/transactions.store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo, useState } from "react";

import styles from "./CategoryTotalChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
   plugins: {
      legend: {
         position: "right" as const,
      },
   },
};

export default function CategoryTotalChart() {
   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );

   // states
   const [noOfCategories, setNoOfCategories] = useState(5);

   // memoized values
   const chartData = useMemo(() => {
      if (!currentTransactions || currentTransactions.length === 0) return null;

      const totalsByCategory = new Map<string, number>();

      currentTransactions.forEach((transaction) => {
         const category = transaction.category || "Uncategorized";
         const currentTotal = totalsByCategory.get(category) ?? 0;

         totalsByCategory.set(
            category,
            Math.abs(currentTotal) + Math.abs(transaction.amount),
         );
      });

      const labels = [...totalsByCategory.keys()];
      const data = [...totalsByCategory.values()];

      return {
         labels,
         datasets: [
            {
               label: "Total Amount by Category",
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

   if (!chartData) {
      return (
         <div className={styles.container}>No transactions to display.</div>
      );
   }

   return (
      <div className={styles.container}>
         <div className={styles.rangeWrapper}>
            <h3
               className={styles.rangeAmount}
            >{`No. of Categories: ${noOfCategories}`}</h3>
            <input
               type="range"
               min={0}
               max={currentTransactions?.length}
               value={noOfCategories}
               onChange={(e) => setNoOfCategories(Number(e.target.value))}
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
