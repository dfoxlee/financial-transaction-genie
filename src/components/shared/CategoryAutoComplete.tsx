import { useRef, useState, type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import StandardBtn from "./StandardBtn";
import { useCategoriesStore } from "../../stores/categories.store";

import styles from "./CategoryAutoComplete.module.css";

interface CategoryAutoCompleteProps {
   value: string;
   onChange: (value: string) => void;
}

export default function CategoryAutoComplete({
   value,
   onChange,
}: CategoryAutoCompleteProps) {
   // stores
   const categories = useCategoriesStore((state) => state.categories);
   const addCategory = useCategoriesStore((state) => state.addCategory);
   const deleteCategory = useCategoriesStore((state) => state.deleteCategory);

   // state
   const [inputValue, setInputValue] = useState(value);
   const [filteredCategories, setFilteredCategories] =
      useState<string[]>(categories);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   // refs
   const containerRef = useRef<HTMLDivElement>(null);

   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setInputValue(newValue);

      onChange(newValue);

      if (newValue.trim() === "") {
         setFilteredCategories(categories);
         return;
      }

      const filtered = categories.filter((c) =>
         c.toLowerCase().includes(newValue.toLowerCase()),
      );
      setFilteredCategories(filtered);
   };

   const handleFocus = () => {
      setFilteredCategories(categories);
      setIsDropdownOpen(true);
   };

   const handleSelectCategory = (category: string) => {
      setInputValue(category);
      onChange(category);
      setIsDropdownOpen(false);
      setFilteredCategories(categories);
   };

   const handleDeleteCategory = (category: string) => {
      deleteCategory(category);
      setFilteredCategories((prev) => prev.filter((c) => c !== category));
   };

   const handleBlur = () => {
      if (inputValue.trim() !== "" && !categories.includes(inputValue)) {
         addCategory(inputValue);
      }
      setIsDropdownOpen(false);
      setFilteredCategories(categories);
   };

   return (
      <div className={styles.container} ref={containerRef} onBlur={handleBlur}>
         <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder="Select or add category"
         />
         {isDropdownOpen && (
            <div className={styles.dropdownWrapper}>
               {!filteredCategories.length ? (
                  <p>No categories found.</p>
               ) : (
                  filteredCategories.map((c) => (
                     <div key={c} className={styles.dropdownItem}>
                        <button
                           className={styles.selectBtn}
                           onMouseDown={(event) => event.preventDefault()}
                           onClick={() => handleSelectCategory(c)}
                        >
                           {c}
                        </button>
                        <div onMouseDown={(event) => event.preventDefault()}>
                           <StandardBtn
                              LeftIcon={FaTrash}
                              theme="danger"
                              onClick={() => handleDeleteCategory(c)}
                           />
                        </div>
                     </div>
                  ))
               )}
            </div>
         )}
      </div>
   );
}
