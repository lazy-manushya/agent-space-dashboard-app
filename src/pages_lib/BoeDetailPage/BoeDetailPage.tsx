"use client";

import { useRouter } from "next/navigation";
import {
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { IBoeDetailPageProps } from "./BoeDetailPage.types";
import { MOCK_BOE_DATA } from "@/pages_lib/BoeSearchPage/BoeSearchPage";
import styles from "./BoeDetailPage.module.css";

function BoeDetailPage({ id }: IBoeDetailPageProps) {
  const router = useRouter();
  const now = today(getLocalTimeZone());

  const boeData = MOCK_BOE_DATA.find(boe => boe.be_no === id);

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

      {!boeData ? (
        <Card className={styles.DetailCard}>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Error:</span>
            <span className={styles.Value}>BOE Number "{id}" not found</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Message:</span>
            <span className={styles.Value}>
              Please go back and select a valid BOE from the search page.
            </span>
          </div>
        </Card>
      ) : (
        <Card className={styles.DetailCard}>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>BE Number:</span>
            <span className={styles.Value}>{boeData.be_no}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Year:</span>
            <span className={styles.Value}>{boeData.year}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>IEC Number:</span>
            <span className={styles.Value}>{boeData.iec_no}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>GST Number:</span>
            <span className={styles.Value}>{boeData.gst_no}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Port Code:</span>
            <span className={styles.Value}>{boeData.port_code}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>BE Date:</span>
            <span className={styles.Value}>{boeData.be_date}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Packages:</span>
            <span className={styles.Value}>{boeData.pkg}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Gross Weight:</span>
            <span className={styles.Value}>{boeData.g_wt}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Exchange Rate:</span>
            <span className={styles.Value}>{boeData.ex_rate}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Invoices:</span>
            <span className={styles.Value}>{boeData.no_of_invoices}</span>
          </div>
          <div className={styles.DetailRow}>
            <span className={styles.Label}>Items:</span>
            <span className={styles.Value}>{boeData.total_items}</span>
          </div>
        </Card>
      )}

      <div className={styles.Note}>
        <p>This is a placeholder page. Real BOE data will be integrated later.</p>
      </div>
    </div>
  );
}

export default BoeDetailPage;
