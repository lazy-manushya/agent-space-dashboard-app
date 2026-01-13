import { joinClassNames } from "@/utils";

import { IAlertsButtonProps } from "./AlertsButton.types";
import styles from "./AlertsButton.module.css";

function AlertsButton({ className }: IAlertsButtonProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
     🔔
    </div>
  );
}

export default AlertsButton;
