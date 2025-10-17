import { Suspense } from "react";
import CalendarClinet from "../../../components/CalendarClinet";

export default function Page() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <CalendarClinet />
    </Suspense>
  );
}
