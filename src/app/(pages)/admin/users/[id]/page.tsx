"use client";

import React from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Download,
  User,
  Briefcase,
  FileText,
  BookOpen,
  Award,
  Phone,
  FileCheck,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  accountType: string;
  contactNumber?: string;
  jobTitle?: string;
}

interface UserResumeInfo {
  resumeUrl: string;
  resumeFileName: string;
  resumeUploadedAt: string;
}

interface ResumeData {
  id: string;
  userId?: string;
  userName?: string;
  fatherOrHusbandName?: string;
  email?: string;
  contact?: string;
  pdfUrl?: string;
  createdAt?: string;
  docId?: string;
  jobType?: string;
  jobCategory?: string;
  dob?: string;
  qualification?: string;
  experience?: string;
  address?: string;
  gender?: string;
  expectedSalary?: string;
  jobDescription?: string;
  location?: string;
  skills?: string;
  jobTiming?: string;
  fileInfo?: {
    name: string;
    size: number;
    type: string;
  };
}

const toISODateString = (value: any): string => {
  if (value?.toDate && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return new Date().toISOString();
};

export default function UserDetailsScreen() {
  const [user, setUser] = React.useState<User | null>(null);
  const [userResume, setUserResume] = React.useState<UserResumeInfo | null>(
    null
  );
  const [resumes, setResumes] = React.useState<ResumeData[]>([]);
  const [selectedResume, setSelectedResume] = React.useState<ResumeData | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const router = useRouter();

  React.useEffect(() => {
    const fetchUserAndResumes = async () => {
      try {
        // Fetch user details
        const userDocRef = doc(db, "Users", params.id as string);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          const hasUserResumeFields =
            "resumeUrl" in userData &&
            "resumeFileName" in userData &&
            "resumeUploadedAt" in userData;

          if (hasUserResumeFields && userData.resumeUrl) {
            setUserResume({
              resumeUrl: String(userData.resumeUrl),
              resumeFileName:
                String(userData.resumeFileName || "").trim() || "Resume",
              resumeUploadedAt: toISODateString(userData.resumeUploadedAt),
            });
          } else {
            setUserResume(null);
          }

          setUser({
            id: userDocSnap.id,
            email: userData.email || "",
            name: userData.name || "",
            isAdmin: userData.isAdmin || false,
            createdAt: toISODateString(userData.createdAt),
            accountType: userData.accountType || "",
            contactNumber: userData.contactNumber || "",
            jobTitle: userData.jobTitle || "",
          });

          // Fetch resumes for this user
          const resumesQuery = query(
            collection(db, "resumes"),
            where("userId", "==", userDocSnap.id)
          );
          const resumesSnapshot = await getDocs(resumesQuery);

          const resumesData = resumesSnapshot.docs.map((resumeDoc) => {
            const resumeData = resumeDoc.data() as Partial<ResumeData>;
            return {
              ...resumeData,
              id: resumeDoc.id,
              createdAt: toISODateString(resumeData.createdAt),
            } as ResumeData;
          });

          setResumes(resumesData);

          // Set first resume as selected if available
          if (resumesData.length > 0) {
            setSelectedResume(resumesData[0]);
          }
        } else {
          console.log("No such user document!");
        }
      } catch (error) {
        console.error("Error getting documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndResumes();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-xl font-medium text-indigo-600 animate-pulse">
          Loading user details...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested user could not be found in our records.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
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
          className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                <p className="text-indigo-100 mt-1">
                  {user.accountType} •{" "}
                  {user.jobTitle || "No job title specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Resume Selection Tabs - Only show if user has resumes */}
          {resumes.length > 0 && (
            <div className="border-b border-gray-200 px-6 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <FileCheck className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Resumes:
                </span>
                {resumes.map((resume, index) => (
                  <button
                    key={resume.id}
                    onClick={() => setSelectedResume(resume)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      selectedResume?.id === resume.id
                        ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    Resume {index + 1} -{" "}
                    {new Date(
                      resume.createdAt || user.createdAt
                    ).toLocaleDateString()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-indigo-50 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                  <User className="mr-2 h-5 w-5" />
                  User Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Account Type
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {user.accountType || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Job Title
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {user.jobTitle || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      User ID
                    </p>
                    <p className="text-sm font-medium text-gray-800 font-mono">
                      {user.id}
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
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Contact Number
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {user.contactNumber || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-500">
                      Account Created
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Resume Details */}
            <div className="lg:col-span-2 space-y-6">
              {userResume && (
                <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                    <FileText className="mr-2 h-5 w-5" />
                    Resume From User Document
                  </h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {userResume.resumeFileName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Uploaded on{" "}
                        {new Date(
                          userResume.resumeUploadedAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <a
                      href={userResume.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </div>
                </div>
              )}

              {selectedResume ? (
                <>
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
                          {selectedResume.jobType || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-blue-500">
                          Job Category
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {selectedResume.jobCategory || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-blue-500">
                          Expected Salary
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {selectedResume.expectedSalary || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-blue-500">
                          Preferred Location
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {selectedResume.location || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-blue-500">
                          Job Timing
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {selectedResume.jobTiming || "Not specified"}
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
                          {selectedResume.qualification || "Not specified"}
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
                          {selectedResume.experience || "Not specified"}
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
                      {(selectedResume.skills || "")
                        .split(",")
                        .filter((skill) => skill.trim())
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      {!selectedResume.skills?.trim() && (
                        <p className="text-sm text-gray-500">
                          No skills listed
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                      <FileText className="mr-2 h-5 w-5" />
                      Job Description
                    </h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {selectedResume.jobDescription ||
                        "No description provided"}
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
                            {selectedResume.fileInfo?.name || "Resume File"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedResume.fileInfo?.size
                              ? `${(
                                  selectedResume.fileInfo.size /
                                  1024 /
                                  1024
                                ).toFixed(2)} MB`
                              : "Size not available"}{" "}
                            •{" "}
                            {selectedResume.fileInfo?.type ||
                              "Type not available"}
                          </p>
                        </div>
                      </div>
                      {selectedResume.pdfUrl ? (
                        <a
                          href={selectedResume.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Download URL not available
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Resume Found In Resumes Collection
                  </h3>
                  <p className="text-gray-500">
                    This user has no documents in the `resumes` collection.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {selectedResume ? (
                <>
                  Resume submitted on:{" "}
                  {new Date(
                    selectedResume.createdAt || user.createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </>
              ) : (
                <>
                  User account created on:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
