import type { TransactionType } from "../types/transaction.types";
import * as z from "zod";

export interface ParseTransactionsError {
   row: number;
   errors: string[];
}

export interface ParseTransactionsResult {
   validTransactions: TransactionType[];
   errors: ParseTransactionsError[];
}

const transactionSchema = z.object({
   transactionDate: z
      .preprocess((value) => {
         if (value instanceof Date) return value;

         if (typeof value === "string") {
            const trimmedValue = value.trim();
            if (!trimmedValue) return undefined;

            return new Date(trimmedValue);
         }

         return value;
      }, z.date())
      .refine((value) => !Number.isNaN(value.getTime()), {
         message: "transactionDate must be a valid date",
      }),
   name: z.string().trim().min(1, { message: "name is required" }),
   description: z.string().trim().optional().default(""),
   category: z.string().trim().optional().default(""),
   amount: z.preprocess(
      (value) => {
         if (typeof value === "number") return value;

         if (typeof value === "string") {
            const normalized = value.replace(/[$,]/g, "").trim();
            return Number(normalized);
         }

         return value;
      },
      z.number().finite({ message: "amount must be a valid number" }),
   ),
});

export const parseTransactions = (
   transactions: unknown[],
): ParseTransactionsResult => {
   const validTransactions: TransactionType[] = [];
   const errors: ParseTransactionsError[] = [];

   transactions.forEach((transaction, index) => {
      const parsedTransaction = transactionSchema.safeParse(transaction);

      if (parsedTransaction.success) {
         validTransactions.push({
            id: index,
            ...parsedTransaction.data,
         });
         return;
      }

      errors.push({
         row: index + 2,
         errors: parsedTransaction.error.issues.map((issue) => issue.message),
      });
   });

   return {
      validTransactions,
      errors,
   };
};
