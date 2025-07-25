"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JobRequirement } from "@/types/job_types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContexts";

// Dummy jobs data for non-logged in users
const DUMMY_JOBS = [
  {
    jobId: "dummy1",
    jobTitle: "Software Engineer",
    companyName: "Tech Company Inc",
    jobLocation: "Remote",
    jobType: "FullTime",
    createdAt: new Date() as any,
    description: "Join our team as a software engineer",
  },
  {
    jobId: "dummy2",
    jobTitle: "Product Manager",
    companyName: "Product Corp",
    jobLocation: "New York",
    jobType: "FullTime",
    createdAt: new Date() as any,
    description: "Lead our product team",
  },
];

export default function NewJobListingComponent() {
  const [jobs, setJobs] = useState<JobRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() || { user: null };
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsRef = collection(db, "JobRequirements");
      const q = query(jobsRef, where("agree", "==", true));
      const jobsSnapshot = await getDocs(q);
      const jobsData = jobsSnapshot.docs.map(
        (doc) => doc.data() as JobRequirement
      );
      setJobs(jobsData);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const handleJobClick = (jobId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }
  };

  const handleApplyClick = (jobId: string, jobTitle: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Redirect to application form with job details
    router.push(
      `/jobs/apply?jobId=${jobId}&jobTitle=${encodeURIComponent(jobTitle)}`
    );
  };

  if (loading && user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const jobsToDisplay = user ? jobs : DUMMY_JOBS;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              New Job Listings
            </h2>
            <p className="text-gray-600">
              Find your next career opportunity from our latest postings
            </p>
          </div>
          <Link
            href="/jobs"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            Explore All Jobs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobsToDisplay.map((job) => (
            <div
              key={job.jobId}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              onClick={() => handleJobClick(job.jobId)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-xl font-bold text-white">
                      {job.jobTitle.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {job.jobTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        {job.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {job.jobLocation}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {job.createdAt &&
                        typeof job.createdAt === "object" &&
                        "toDate" in job.createdAt
                          ? job.createdAt.toDate().toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        job.jobType === "FullTime"
                          ? "bg-blue-100 text-red-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {job.jobType}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyClick(job.jobId, job.jobTitle);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
