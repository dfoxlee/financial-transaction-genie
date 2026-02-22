import { FaMaximize, FaMinimize } from "react-icons/fa6";
import StandardBtn from "../../shared/StandardBtn";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

import styles from "./AssignCategoriesModal.module.css";

interface AssignCategoriesModalProps {
   onClose: () => void;
}

export default function AssignCategoriesModal({
   onClose,
}: AssignCategoriesModalProps) {
   // states
   const [isMaximized, setIsMaximized] = useState(false);

   // functions
   const toggleMaximize = () => {
      setIsMaximized((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
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
         </div>
      </div>
   );
}
