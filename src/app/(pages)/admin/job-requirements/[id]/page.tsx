"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContexts";
import { useRouter, useParams } from "next/navigation";
import { JobRequirement } from "@/types/job_types";

export default function JobRequirementDetail() {
  const [job, setJob] = useState<JobRequirement | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() || { user: null };
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "JobRequirements", jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          let createdAt = "Unknown Date";

          if (data.createdAt) {
            if (typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate().toLocaleDateString();
            } else if (data.createdAt.seconds) {
              createdAt = new Date(
                data.createdAt.seconds * 1000
              ).toLocaleDateString();
            } else if (typeof data.createdAt === "string") {
              createdAt = new Date(data.createdAt).toLocaleDateString();
            }
          }

          setJob({
            jobId: docSnap.id,
            jobTitle: data.jobTitle || "Untitled Position",
            companyName: data.companyName || "Unknown Company",
            jobDescription: data.jobDescription || "",
            jobLocation: data.jobLocation || "",
            jobType: data.jobType || "",
            agree: data.agree || false,
            uid: data.uid,
            skillsRequired: data.skillsRequired || [],
            requiredQualification: data.requiredQualification || "",
            phoneNumber: data.phoneNumber || "",
            openings: data.openings || "",
            monthlySalary: data.monthlySalary || "",
            jobTiming: data.jobTiming || "",
            jobAddress: data.jobAddress || "",
            interviewTime: data.interviewTime || "",
            experienceRequired: data.experienceRequired || "",
            email: data.email || "",
            contactPersonProfile: data.contactPersonProfile || "",
            contactPersonName: data.contactPersonName || "",
            bonus: data.bonus || "",
            createdAt: data.createdAt,
          });
        } else {
          console.log("No such document!");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Job Details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Job not found</div>
      </div>
    );
  }

  const formatDate = (date: any) => {
    if (!date) return "Not specified";
    if (typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString();
    } else if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    } else if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return "Not specified";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gray-800 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{job.jobTitle}</h1>
              <h2 className="text-xl md:text-2xl mt-1 text-gray-300">
                {job.companyName}
              </h2>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                job.agree
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {job.agree ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm">
              {job.jobLocation}
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm">
              {job.jobType}
            </span>
            {job.monthlySalary && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm">
                Salary: {job.monthlySalary}
              </span>
            )}
            {job.openings && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm">
                Openings: {job.openings}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Section title="Job Description">
              <p className="text-gray-700 whitespace-pre-line">
                {job.jobDescription || "Not specified"}
              </p>
            </Section>

            <Section title="Required Qualifications">
              <p className="text-gray-700 whitespace-pre-line">
                {job.requiredQualification || "Not specified"}
              </p>
            </Section>

            <Section title="Experience Required">
              <p className="text-gray-700">
                {job.experienceRequired || "Not specified"}
              </p>
            </Section>

            <Section title="Skills Required">
              {typeof job.skillsRequired === "string" ? (
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired
                    .split(",")
                    .map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">Not specified</p>
              )}
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Section title="Job Details">
              <DetailItem label="Job Type" value={job.jobType} />
              <DetailItem label="Job Timing" value={job.jobTiming} />
              <DetailItem label="Job Address" value={job.jobAddress} />
              <DetailItem label="Monthly Salary" value={job.monthlySalary} />
              <DetailItem label="Bonus" value={job.bonus} />
            </Section>

            <Section title="Interview Details">
              <DetailItem label="Interview Time" value={job.interviewTime} />
              <DetailItem
                label="Contact Person"
                value={job.contactPersonName}
              />
              <DetailItem
                label="Contact Profile"
                value={job.contactPersonProfile}
              />
            </Section>

            <Section title="Contact Information">
              <DetailItem label="Email" value={job.email} />
              <DetailItem label="Phone Number" value={job.phoneNumber} />
            </Section>

            <Section title="Additional Information">
              <DetailItem label="Posted On" value={formatDate(job.createdAt)} />
              <DetailItem
                label="Status"
                value={job.agree ? "Approved" : "Pending Approval"}
              />
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">Job ID: {job.jobId}</p>
          <button
            onClick={() => router.push("/admin?tab=jobs")}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

// Reusable Detail Item Component
const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="mb-3">
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    <p className="text-gray-700 mt-1">
      {value || <span className="text-gray-400">Not specified</span>}
    </p>
  </div>
);
