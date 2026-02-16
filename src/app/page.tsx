import { Suspense } from "react";
import BoeSearchPage from "@/pages_lib/BoeSearchPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoeSearchPage />
    </Suspense>
  );
}
