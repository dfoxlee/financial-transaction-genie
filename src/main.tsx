import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Bounce, ToastContainer } from "react-toastify";

import "./reset.css";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={true}
         closeOnClick={true}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="dark"
         transition={Bounce}
      />
      <App />
   </StrictMode>,
);
