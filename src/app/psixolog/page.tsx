import { Suspense } from "react";
import PsixologClient from "../../../components/PsixologClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <PsixologClient />
    </Suspense>
  );
}
