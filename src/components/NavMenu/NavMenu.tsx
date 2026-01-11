import { joinClassNames } from "@/utils";

import Link from "@/components/Link";

import { INavMenuProps } from "./NavMenu.types";
import styles from "./NavMenu.module.css";

export function NavMenu({ className }: INavMenuProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
    </div>
  );
}

export default NavMenu;
