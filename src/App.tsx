import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Instructions from "./components/instructions/Instructions";
import { useTransactionsStore } from "./stores/transactions.store";

import "./globals.css";

export default function App() {
   // stores
   const currentTransactions = useTransactionsStore(
      (state) => state.currentTransactions,
   );

   return (
      <div className="App">
         <Header />
         {!currentTransactions ? <Instructions /> : <Home />}
      </div>
   );
}
