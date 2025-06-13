import { Suspense } from "react";
import JobApplicationPage from "../components/jobApplicationPage";

export default function JobApplyPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobApplicationPage />
    </Suspense>
  );
}
