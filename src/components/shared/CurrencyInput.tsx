import { FaDollarSign } from "react-icons/fa";
import { useState, type ChangeEvent } from "react";

import styles from "./CurrencyInput.module.css";

interface CurrencyInputProps {
   value: number;
   onChange: (value: number) => void;
}

export default function CurrencyInput({ value, onChange }: CurrencyInputProps) {
   // states
   const [inputValue, setInputValue] = useState(value.toFixed(2));

   // handlers
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(parseFloat(newValue) || 0);
   };

   const handleInputBlur = () => {
      const parsedValue = parseFloat(inputValue);

      if (isNaN(parsedValue)) {
         setInputValue(value.toFixed(2));
         return;
      }

      setInputValue(parsedValue.toFixed(2));
   };

   return (
      <div className={styles.container}>
         <FaDollarSign className={styles.icon} />
         <input
            className={styles.input}
            type="number"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
         />
      </div>
   );
}
