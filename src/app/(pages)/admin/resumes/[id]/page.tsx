// app/admin/resumes/[id]/page.tsx
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
  DollarSign,
  BookOpen,
  Award,
  Phone,
  Mail,
  Home,
  Calendar,
} from "lucide-react";

interface ResumeData {
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

export default function ResumeDetailsPage() {
  const [resume, setResume] = React.useState<ResumeData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const router = useRouter();

  React.useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, "resumes", params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as ResumeData;
          setResume({
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

    fetchResume();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-xl font-medium text-indigo-600 animate-pulse">
          Loading resume details...
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Resume Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested resume could not be found in our records.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          // variant="ghost"
          className="mb-6 text-indigo-600 hover:bg-indigo-100"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {resume.userName}
                </h1>
                <p className="text-indigo-100 mt-1">
                  {resume.jobType} {resume.jobCategory}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                  <a
                    href={resume.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-indigo-50 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Father/Husband Name
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.fatherOrHusbandName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.dob}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Gender
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.gender}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-indigo-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Phone (WhatsApp)
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.contact}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Address
                    </p>
                    <p className="text-sm font-medium text-gray-800 whitespace-pre-line">
                      {resume.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Professional Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Preferences */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Job Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-500">
                      Job Type
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.jobType}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-500">
                      Job Category
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.jobCategory}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-500">
                      Expected Salary
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.expectedSalary}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-500">
                      Preferred Location
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.location}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-500">
                      Job Timing
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {resume.jobTiming}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Education
                  </h2>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Qualification
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {resume.qualification}
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                    <Award className="mr-2 h-5 w-5" />
                    Experience
                  </h2>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Professional Experience
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {resume.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Job Description
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {resume.jobDescription}
                </p>
              </div>

              {/* Resume File Card */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Resume File
                </h2>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {resume.fileInfo.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(resume.fileInfo.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {resume.fileInfo.type}
                      </p>
                    </div>
                  </div>
                  <button
                    // asChild
                    // variant="outline"
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                  >
                    <a
                      href={resume.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Submitted on:{" "}
              {new Date(resume.createdAt).toLocaleDateString("en-US", {
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
