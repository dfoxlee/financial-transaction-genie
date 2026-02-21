import styles from "./DateInput.module.css";

interface DateInputProps {
   value: Date;
   onChange: (value: string) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
   return (
      <input
         className={styles.input}
         type="date"
         value={value.toLocaleDateString("en-CA")}
         onChange={(e) => onChange(e.target.value)}
      />
   );
}
