import { joinClassNames } from "@/utils";
import Layout from "@/features/Layout";

import { IDashboardPageProps } from "./DashboardPage.types";
import styles from "./DashboardPage.module.css";

function DashboardPage({ className }: IDashboardPageProps) {
  return (
    <Layout>
      <div className={joinClassNames(className, styles.Container)}>
        Dashboard Page
      </div>
    </Layout>
  );
}

export default DashboardPage;
