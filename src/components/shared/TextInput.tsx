import { type ChangeEvent, type CSSProperties } from "react";
import styles from "./TextInput.module.css";

interface TextInputProps {
   style?: CSSProperties;
   value: string;
   onChange?: (value: string) => void;
   placeholder?: string;
}

export default function TextInput({
   value,
   onChange,
   placeholder,
   style,
}: TextInputProps) {
   // handlers
   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      onChange(event.target.value);
   };

   return (
      <input
         className={styles.input}
         style={style}
         type="text"
         value={value}
         onChange={handleInputChange}
         placeholder={placeholder}
         onBlur={handleInputChange}
      />
   );
}
