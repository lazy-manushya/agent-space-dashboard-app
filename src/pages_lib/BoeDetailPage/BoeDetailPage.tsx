"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { IBoeDetailPageProps } from "./BoeDetailPage.types";
import styles from "./BoeDetailPage.module.css";

function BoeDetailPage({ id }: IBoeDetailPageProps) {
  const router = useRouter();

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className={styles.BackButton}
        >
          ← Back to Search
        </Button>
        <h1 className={styles.Title}>BOE Details</h1>
      </div>

      <Card className={styles.DetailCard}>
        <div className={styles.DetailRow}>
          <span className={styles.Label}>BE Number:</span>
          <span className={styles.Value}>{id}</span>
        </div>
        <div className={styles.DetailRow}>
          <span className={styles.Label}>Status:</span>
          <span className={styles.Value}>Active</span>
        </div>
        <div className={styles.DetailRow}>
          <span className={styles.Label}>Port Code:</span>
          <span className={styles.Value}>INNSA1</span>
        </div>
        <div className={styles.DetailRow}>
          <span className={styles.Label}>IEC Number:</span>
          <span className={styles.Value}>IEC9000000001</span>
        </div>
        <div className={styles.DetailRow}>
          <span className={styles.Label}>Date:</span>
          <span className={styles.Value}>2024-01-02</span>
        </div>
      </Card>

      <div className={styles.Note}>
        <p>This is a placeholder page. Real BOE data will be integrated later.</p>
      </div>
    </div>
  );
}

export default BoeDetailPage;
