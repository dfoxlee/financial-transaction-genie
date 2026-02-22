import { useMemo } from "react";
import { useTransactionsStore } from "../../../stores/transactions.store";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   type ChartData,
   type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./TransactionsOverTimeChart.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
);

export default function TransactionsOverTimeChart() {
   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );

   // memoized values
   const chartData = useMemo<ChartData<"line"> | null>(() => {
      if (!currentTransactions || currentTransactions.length === 0) return null;

      const totalsByDate = new Map<string, number>();

      currentTransactions.forEach((transaction) => {
         const dateKey = new Date(transaction.transactionDate)
            .toISOString()
            .slice(0, 10);
         const currentTotal = totalsByDate.get(dateKey) ?? 0;

         totalsByDate.set(dateKey, currentTotal + transaction.amount);
      });

      const sortedEntries = [...totalsByDate.entries()].sort(([dateA], [dateB]) =>
         dateA.localeCompare(dateB),
      );

      const labels = sortedEntries.map(([date]) =>
         new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
         }),
      );

      const dailyTotals = sortedEntries.map(([, total]) =>
         Number(total.toFixed(2)),
      );

      return {
         labels,
         datasets: [
            {
               label: "Daily Total ($)",
               data: dailyTotals,
               borderColor: "rgba(102, 252, 241, 1)",
               backgroundColor: "rgba(102, 252, 241, 0.2)",
               tension: 0.25,
               fill: true,
               pointRadius: 3,
               pointHoverRadius: 5,
            },
         ],
      };
   }, [currentTransactions]);

   const options = useMemo<ChartOptions<"line">>(
      () => ({
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               position: "top",
               labels: {
                  color: "#eceef0",
               },
            },
            title: {
               display: true,
               text: "Transactions Over Time",
               color: "#eceef0",
            },
            tooltip: {
               callbacks: {
                  label: (context) => {
                     const value = context.parsed.y ?? 0;
                     return `Daily Total: $${value.toFixed(2)}`;
                  },
               },
            },
         },
         scales: {
            x: {
               ticks: {
                  color: "#eceef0",
               },
               grid: {
                  color: "rgba(236, 238, 240, 0.08)",
               },
            },
            y: {
               ticks: {
                  color: "#eceef0",
                  callback: (tickValue) => `$${Number(tickValue).toFixed(0)}`,
               },
               grid: {
                  color: "rgba(236, 238, 240, 0.08)",
               },
            },
         },
      }),
      [],
   );

   return (
      <div className={styles.container}>
         {chartData ? (
            <Line options={options} data={chartData} />
         ) : (
            <p className={styles.emptyText}>No transactions available.</p>
         )}
      </div>
   );
}
