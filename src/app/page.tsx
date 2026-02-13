import { Suspense } from "react";
import DashboardPage from "@/pages_lib/DashboardPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
