"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContexts";
import { useRouter } from "next/navigation";
import { UserDetails } from "@/types/userDetails";

interface Resume {
  id: string;
  userName: string;
  pdfUrl: string;
  createdAt: string;
}

interface JobRequirement {
  id: string;
  jobTitle: string;
  companyName: string;
  agree: boolean;
  createdAt: string;
}

interface AppliedJob {
  id: string;
  appliedAt: string;
  coverLetter: string;
  fullName: string;
  jobId: string;
  jobTitle: string;
  phone: string;
  resumeFileName: string;
  resumeFileSize: string;
  resumeFileType: string;
  resumeUrl: string;
  status: string;
  userEmail: string;
  userId: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  accountType: string;
}

type ActiveTab = "resumes" | "jobs" | "applied" | "users";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobs, setJobs] = useState<JobRequirement[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("resumes");
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth() || { user: null };
  const router = useRouter();

  useEffect(() => {
    console.log("Initializing Admin Dashboard check...");

    const checkAdminStatus = async () => {
      if (!user) {
        console.log("No user found, redirecting...");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("Checking admin status for user:", user.uid);
        const userDoc = await getDoc(doc(db, "Users", user.uid));

        if (!userDoc.exists() || !userDoc.data().isAdmin) {
          console.log("User is not an admin:", user.uid);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        console.log("User is admin:", user.uid);
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    const fetchResumes = async () => {
      try {
        console.log("Fetching resumes...");
        const resumesSnapshot = await getDocs(collection(db, "resumes"));
        const resumesData = resumesSnapshot.docs.map((doc) => {
          const data = doc.data();
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

          return {
            id: doc.id,
            userName: data.userName || "Unknown",
            pdfUrl: data.pdfUrl || "",
            createdAt,
          };
        });

        console.log("Fetched resumes count:", resumesData.length);
        setResumes(resumesData);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        console.log("Fetching job requirements...");
        const jobsSnapshot = await getDocs(collection(db, "JobRequirements"));
        const jobsData = jobsSnapshot.docs.map((doc) => {
          const data = doc.data();
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

          return {
            id: doc.id,
            jobTitle: data.jobTitle || "Untitled Position",
            companyName: data.companyName || "Unknown Company",
            agree: data.agree || false,
            createdAt,
          };
        });

        console.log("Fetched jobs count:", jobsData.length);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching job requirements:", error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        console.log("Fetching applied jobs...");
        const appliedJobsSnapshot = await getDocs(
          collection(db, "AppliedJobs")
        );
        const appliedJobsData = appliedJobsSnapshot.docs.map((doc) => {
          const data = doc.data();
          let appliedAt = "Unknown Date";

          if (data.appliedAt) {
            if (typeof data.appliedAt.toDate === "function") {
              appliedAt = data.appliedAt.toDate().toLocaleString();
            } else if (data.appliedAt.seconds) {
              appliedAt = new Date(
                data.appliedAt.seconds * 1000
              ).toLocaleString();
            } else if (typeof data.appliedAt === "string") {
              appliedAt = new Date(data.appliedAt).toLocaleString();
            }
          }

          return {
            id: doc.id,
            appliedAt,
            coverLetter: data.coverLetter || "",
            fullName: data.fullName || "Unknown",
            jobId: data.jobId || "",
            jobTitle: data.jobTitle || "Unknown Position",
            phone: data.phone || "",
            resumeFileName: data.resumeFileName || "",
            resumeFileSize: data.resumeFileSize || "",
            resumeFileType: data.resumeFileType || "",
            resumeUrl: data.resumeUrl || "",
            status: data.status || "pending",
            userEmail: data.userEmail || "",
            userId: data.userId || "",
          };
        });

        console.log("Fetched applied jobs count:", appliedJobsData.length);
        setAppliedJobs(appliedJobsData);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        console.log("Fetching all users...");
        const usersSnapshot = await getDocs(collection(db, "Users"));
        const usersData = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
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

          return {
            id: doc.id,
            email: data.email || "No email",
            name: data.name || "Unknown",
            isAdmin: data.isAdmin || false,
            accountType: data.accountType,
            createdAt,
          };
        });

        console.log("Fetched users count:", usersData.length);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const initializeDashboard = async () => {
      await checkAdminStatus();

      if (isAdmin) {
        await Promise.all([
          fetchResumes(),
          fetchJobs(),
          fetchAppliedJobs(),
          fetchAllUsers(),
        ]);
      }
      setLoading(false);
    };

    initializeDashboard();
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading Admin Dashboard...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
          <p className="font-bold">Access Denied</p>
          <p>You don't have permission to access this page</p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "resumes":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Resume Submissions
              </h2>
              <p className="text-sm text-gray-600">
                {resumes.length} resumes found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resumes.map((resume) => (
                    <tr key={resume.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {resume.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {resume.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={resume.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900 hover:underline"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                  {resumes.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No resumes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "jobs":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Job Requirements
              </h2>
              <p className="text-sm text-gray-600">
                {jobs.length} job postings found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Posted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.jobTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.companyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {job.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            router.push(`/admin/job-requirements/${job.id}`)
                          }
                          className="text-indigo-600 hover:text-indigo-900 hover:underline mr-4"
                        >
                          View
                        </button>

                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={job.agree}
                            onChange={async () => {
                              try {
                                await updateDoc(
                                  doc(db, "JobRequirements", job.id),
                                  {
                                    agree: !job.agree,
                                  }
                                );
                                // Update local state for immediate UI feedback
                                setJobs(
                                  jobs.map((j) =>
                                    j.id === job.id
                                      ? { ...j, agree: !j.agree }
                                      : j
                                  )
                                );
                              } catch (error) {
                                console.error(
                                  "Error toggling job status:",
                                  error
                                );
                              }
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {job.agree ? "Active" : "Inactive"}
                          </span>
                        </label>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No job requirements found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "applied":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Applied Jobs
              </h2>
              <p className="text-sm text-gray-600">
                {appliedJobs.length} applications found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appliedJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.userEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.jobTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {job.appliedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      job.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : job.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <a
                          href={job.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900 hover:underline"
                        >
                          Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                  {appliedJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No applied jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                User Management
              </h2>
              <p className="text-sm text-gray-600">
                {users.length} users registered
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isAdmin
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-blue-800 uppercase">
                            {user.accountType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.createdAt}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-xl">
        <div className="p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-indigo-200 truncate">
            Welcome, {user?.email}
          </p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("resumes")}
                className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${
                  activeTab === "resumes"
                    ? "bg-white text-indigo-700 shadow-md"
                    : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${
                  activeTab === "jobs"
                    ? "bg-white text-indigo-700 shadow-md"
                    : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Job Requirements
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("applied")}
                className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${
                  activeTab === "applied"
                    ? "bg-white text-indigo-700 shadow-md"
                    : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Applied Jobs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${
                  activeTab === "users"
                    ? "bg-white text-indigo-700 shadow-md"
                    : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                User Management
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === "resumes" && "Resume Management"}
            {activeTab === "jobs" && "Job Requirements"}
            {activeTab === "applied" && "Applied Jobs Management"}
            {activeTab === "users" && "User Management"}
          </h1>
          <p className="text-gray-600 mt-2">
            {activeTab === "resumes" && "View and manage all submitted resumes"}
            {activeTab === "jobs" && "Manage job postings and requirements"}
            {activeTab === "applied" && "View and manage all job applications"}
            {activeTab === "users" && "Manage all registered users"}
          </p>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
}
