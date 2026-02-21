import type { IconType } from "react-icons";
import { useMemo, type CSSProperties } from "react";

import styles from "./StandardBtn.module.css";

interface StandardBtnProps {
   style?: CSSProperties;
   LeftIcon?: IconType;
   RightIcon?: IconType;
   text?: string;
   onClick?: (() => void) | (() => Promise<void>);
   theme?: "standard" | "info" | "danger" | "success";
   disabled?: boolean;
   filled?: boolean;
   outlined?: boolean;
}

export default function StandardBtn(props: StandardBtnProps) {
   const classNames = useMemo(() => {
      const classNames = [styles.btn];

      if (props.filled) {
         switch (props.theme) {
            case "info":
               classNames.push(styles.filledInfo);
               break;
            case "danger":
               classNames.push(styles.filledDanger);
               break;
            case "success":
               classNames.push(styles.filledSuccess);
               break;
            default:
               classNames.push(styles.filledStandard);
         }
      } else if (props.outlined) {
         switch (props.theme) {
            case "info":
               classNames.push(styles.outlinedInfo);
               break;
            case "danger":
               classNames.push(styles.outlinedDanger);
               break;
            case "success":
               classNames.push(styles.outlinedSuccess);
               break;
            default:
               classNames.push(styles.outlinedStandard);
         }
      } else {
         switch (props.theme) {
            case "info":
               classNames.push(styles.info);
               break;
            case "danger":
               classNames.push(styles.danger);
               break;
            case "success":
               classNames.push(styles.success);
               break;
            default:
               classNames.push(styles.standard);
         }
      }

      if (props.disabled) {
         classNames.push(styles.disabled);
      }

      return classNames.join(" ");
   }, [props]);

   return (
      <button
         className={classNames}
         style={props.style}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.LeftIcon && <props.LeftIcon className={styles.icon} />}
         {props.text}
         {props.RightIcon && <props.RightIcon className={styles.icon} />}
      </button>
   );
}
