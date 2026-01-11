import { joinClassNames } from "@/utils";

import { IDashboardPageProps } from "./DashboardPage.types";
import styles from "./DashboardPage.module.css";

function DashboardPage({ className }: IDashboardPageProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      Dashboard Page
    </div>
  );
}

export default DashboardPage;
