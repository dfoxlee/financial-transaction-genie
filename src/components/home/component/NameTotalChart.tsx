import { useTransactionsStore } from "../../../stores/transactions.store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";

import styles from "./NameTotalChart.module.css";

export default function NameTotalChart() {
   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );

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

   if (!chartData) {
      return (
         <div className={styles.container}>
            <p>No transactions available to display.</p>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <Pie data={chartData} />
      </div>
   );
}
