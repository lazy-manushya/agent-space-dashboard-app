import { joinClassNames } from "@/utils";

import { ILogoProps } from "./Logo.types";
import styles from "./Logo.module.css";

function Logo({ className }: ILogoProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      DASH
    </div>
  );
}

export default Logo;
