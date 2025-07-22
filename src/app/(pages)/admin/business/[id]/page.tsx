"use client";

import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Download,
  User,
  Briefcase,
  FileText,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Phone,
  IndianRupee,
} from "lucide-react";

interface BusinessData {
  id: string;
  userId: string;
  userName: string;
  fatherOrHusbandName: string;
  email: string;
  contact: string;
  pdfUrl: string;
  createdAt: string;
  docId: string;
  jobType: string;
  jobCategory: string;
  dob: string;
  qualification: string;
  experience: string;
  address: string;
  gender: string;
  expectedSalary: string;
  jobDescription: string;
  location: string;
  skills: string;
  jobTiming: string;
  fileInfo: {
    name: string;
    size: number;
    type: string;
  };
}

export default function BusinessDetailsPage() {
  const [business, setBusiness] = React.useState<BusinessData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const router = useRouter();

  React.useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const docRef = doc(db, "business", params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as BusinessData;
          setBusiness({
            ...data,
            id: docSnap.id,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse text-lg font-medium text-blue-600">
          Loading business details...
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Business Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            The requested business could not be found in our records.
          </p>
          <button
            onClick={() => router.back()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
            <div className="flex flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {business.userName}
                </h1>
                <p className="mt-1 text-blue-100">
                  {business.jobType} • {business.jobCategory}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href={business.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
            {/* Left Column - Personal Info */}
            <div className="space-y-6 lg:col-span-1">
              {/* Personal Information Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Full Name</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.userName}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">
                        Father/Husband Name
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.fatherOrHusbandName}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Date of Birth</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.dob}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Gender</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.gender}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Email</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.email}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Phone</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.contact}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[120px]">
                      <p className="text-sm text-gray-500">Address</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {business.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Professional Info */}
            <div className="space-y-6 lg:col-span-2">
              {/* Job Preferences Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Business Preferences
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-gray-500">
                        Business Type
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.jobType}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-gray-500">
                        Business Category
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.jobCategory}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center">
                      <IndianRupee className="mr-2 h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-gray-500">
                        Expected Salary
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.expectedSalary}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-gray-500">
                        Preferred Location
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.location}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-blue-500" />
                      <p className="text-sm font-medium text-gray-500">
                        Business Timing
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.jobTiming}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Experience Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                    <div className="mr-3 rounded-full bg-blue-100 p-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Education
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Qualification</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.qualification}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                    <div className="mr-3 rounded-full bg-blue-100 p-2">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Experience
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Professional Experience
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {business.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {business.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Description Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Business Description
                  </h2>
                </div>
                <p className="whitespace-pre-line text-sm text-gray-700">
                  {business.jobDescription}
                </p>
              </div>

              {/* Resume File Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center border-b border-gray-100 pb-3">
                  <div className="mr-3 rounded-full bg-blue-100 p-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Resume File
                  </h2>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    {business.fileInfo && (
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {business.fileInfo.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(business.fileInfo.size / 1024 / 1024).toFixed(2)} MB
                          • {business.fileInfo.type}
                        </p>
                      </div>
                    )}
                  </div>
                  <a
                    href={business.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Submitted on:{" "}
              {new Date(business.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
