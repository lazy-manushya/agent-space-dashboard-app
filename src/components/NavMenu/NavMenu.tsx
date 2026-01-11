import { joinClassNames } from "@/utils";

import { INavMenuProps } from "./NavMenu.types";
import styles from "./NavMenu.module.css";

export function NavMenu({ className }: INavMenuProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      Nav Menu
    </div>
  );
}

export default NavMenu;
