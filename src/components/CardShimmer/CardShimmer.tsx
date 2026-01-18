"use client";

import ShimmerLoader from "@/components/ShimmerLoader";
import Card from "@/components/Card";
import { ICardShimmerProps } from "./CardShimmer.types";
import styles from "./CardShimmer.module.css";

function CardShimmer({ className, count = 1 }: ICardShimmerProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={`card-shimmer-${index}`} className={className}>
          <div className={styles.CardContent}>
            <ShimmerLoader.Default style={{ height: "1.5rem", width: "60%", marginBottom: "1rem" }} />
            <ShimmerLoader.Default style={{ height: "1rem", width: "100%", marginBottom: "0.5rem" }} />
            <ShimmerLoader.Default style={{ height: "1rem", width: "80%", marginBottom: "0.5rem" }} />
            <ShimmerLoader.Default style={{ height: "1rem", width: "90%"}} />
          </div>
        </Card>
      ))}
    </>
  );
}

export default CardShimmer;
